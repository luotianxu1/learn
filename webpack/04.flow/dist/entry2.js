
      (() => {
      var modules = ({
        
          "./src/title2.js":(module,exports,require)=>{
            module.exports = 'title2';
          }
        ,
          "./src/entry2.js":(module,exports,require)=>{
            let title = require("./src/title2.js");
console.log('entry2', title);
          }
        
      });
      var cache = {};
      function require(moduleId) {
        var cachedModule = cache[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        var module = cache[moduleId] = {
          exports: {}
        };
        modules[moduleId](module, module.exports, require);
        return module.exports;
      }
      var exports = {};
      let title = require("./src/title2.js");
console.log('entry2', title);
      })()
      ;
    