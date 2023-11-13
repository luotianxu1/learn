
const fs = require('fs');
/**
 * 根据loader模块的绝对路径得到loader对象
 * @param {*} loader 
 */
function createLoaderObject(loader) {
  const normal = require(loader);
  const pitch = normal.pitch;
  return {
    path: loader,//loader的绝对路径
    normal,
    pitch,
    raw: normal.raw,//如果raw为true,那么normal参数就是Buffer
    data: {},//每个loader对象都会有一个自定义data对象
    pitchExecuted: false,//此loader的pitch函数已经执行过了吗
    normalExecuted: false//此loader的normal函数已经执行过吗
  }
}
function processResource(processOptions, loaderContext, pitchingCallback) {
  processOptions.readResource(loaderContext.resource, (err, resourceBuffer) => {
    processOptions.resourceBuffer = resourceBuffer;
    loaderContext.loaderIndex--;//减1会后会指向最后一个loader
    iterateNormalLoaders(processOptions, loaderContext, [resourceBuffer], pitchingCallback)
  });
}
function convertArgs(args, raw) {
  if (raw && !Buffer.isBuffer(args[0])) {
    args[0] = Buffer.from(args[0]);
  } else if (!raw && Buffer.isBuffer(args[0])) {
    args[0] = args[0].toString('utf8');
  }
}
function iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback) {
  if (loaderContext.loaderIndex < 0) {
    return pitchingCallback(null, args);
  }
  const currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
  if (currentLoader.normalExecuted) {
    loaderContext.loaderIndex--
    return iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback);
  }
  let normalFn = currentLoader.normal;
  currentLoader.normalExecuted = true;
  convertArgs(args, currentLoader.raw);
  runSyncOrAsync(normalFn, loaderContext, args, (err, ...returnArgs) => {
    if (err) return pitchingCallback(err)
    return iterateNormalLoaders(processOptions, loaderContext, returnArgs, pitchingCallback);
  });
}
function iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback) {
  if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
    return processResource(processOptions, loaderContext, pitchingCallback);
  }
  const currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
  if (currentLoader.pitchExecuted) {
    loaderContext.loaderIndex++;
    return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
  }
  let pitchFn = currentLoader.pitch;
  currentLoader.pitchExecuted = true;//不管pitch函数有没有，都把这个pitchExecuted设置为true
  //如果pitch函数不存在，则递归iteratePitchingLoaders
  if (!pitchFn) {
    return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
  }
  //如果pitchFn有值 以同步或者异步调用pitchFn方法，以loaderContext为this指针 
  runSyncOrAsync(pitchFn, loaderContext,
    [loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data], (err, ...args) => {
      //判断有没有返回值, 如果有返回值，需要掉头执行前一个loader的normal
      if (args.length > 0 && args.some(item => item)) {
        loaderContext.loaderIndex--;
        iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback)
      } else {
        return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
      }
    });
}
function runSyncOrAsync(fn, loaderContext, args, runCallback) {
  let isSync = true;//默认loader的执行同步的
  let isDone = false;//表示此函数已经完成
  loaderContext.callback = (err, ...args) => {
    if (isDone) {//runCallback 只能调用一次
      throw new Error("async(): The callback was already called.");
    }
    isDone = true;
    runCallback(err, ...args)
  };
  loaderContext.async = () => {
    isSync = false;//把isSync是否同步执行的标志 从同步变成异步
    return loaderContext.callback;
  }
  let result = fn.apply(loaderContext, args);//fn.call(loaderContext,...args) fn.apply(loaderContext,args);
  if (isSync) {//如果isSync同步的话，由本方法直接 调用runCallback,用来执行下一个loader
    isDone = true;
    runCallback(null, result)
  }
}
function runLoaders(options, finalCallback) {
  debugger
  const { resource, loaders = [], context = {}, readResource = fs.readFile } = options;
  const loaderObjects = loaders.map(createLoaderObject);
  const loaderContext = context;//会成为loader执行过程中的this指针
  loaderContext.resource = resource;
  loaderContext.readResource = readResource;
  loaderContext.loaders = loaderObjects;
  loaderContext.loaderIndex = 0;//当前正在执行的loader 的索引
  loaderContext.callback = null;//调用callback可以让当前的loader执行结束，并且向后续 的loader传递多个值
  loaderContext.async = null;//是内置方法，可以把loader的执行从同步变成异步
  Object.defineProperty(loaderContext, 'request', {
    get() {//loader1!loader2!loader3!file.js
      return loaderContext.loaders.map(loader => loader.path).concat(loaderContext.resource).join('!');
    }
  });
  Object.defineProperty(loaderContext, 'remainingRequest', {
    get() {//loader3!file.js
      return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loader => loader.path).concat(loaderContext.resource).join('!');
    }
  });
  Object.defineProperty(loaderContext, 'currentRequest', {
    get() {//loader2!loader3!file.js
      return loaderContext.loaders.slice(loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!');
    }
  });
  Object.defineProperty(loaderContext, 'previousRequest', {
    get() {//loader1
      return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!');
    }
  });
  Object.defineProperty(loaderContext, 'data', {
    get() {//loader1
      return loaderContext.loaders[loaderContext.loaderIndex].data;
    }
  });

  let processOptions = {
    resourceBuffer: null,//存放着要加载的模块的原始内容
    readResource//读取文件的方法，默认值是fs.readFile
  }
  //开始从左向右迭代执行loader的pitch  PitchingCallback
  iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
    finalCallback(err, {
      result,
      resourceBuffer: processOptions.resourceBuffer
    });
  })
}
exports.runLoaders = runLoaders;