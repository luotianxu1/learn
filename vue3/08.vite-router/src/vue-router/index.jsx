import { computed, Fragment, h, inject, provide, reactive, ref, shallowRef, toRefs, unref,Comment } from 'vue'

export * from './history'

function normalizeRecord(record) {
    return {
        path: record.path,
        components: {
            default: record.component,
            ...(record.components ? record.components : {})
        },
        children: record.children || [],
        beforeEnter: record.beforeEnter,
        meta: record.meta
        // ... props , name , ....
    }
}

function createRecord(record, parent) {
    const obj = {
        path: parent?.path ? parent.path + record.path : record.path,
        record,
        parent,
        children: []
    }
    if (parent) {
        parent.children.push(obj)
    }
    return obj
}
function createRouterMatcher(routes) {
    const matchers = [];
    function addRoute(record, parent) {
        // 需要将用户写的record格式化 在存入
        let normalRecord = normalizeRecord(record)

        let newRecord = createRecord(normalRecord, parent);

        for (let i = 0; i < normalRecord.children.length; i++) {
            const child = normalRecord.children[i]
            addRoute(child, newRecord)
        }
        matchers.push(newRecord)
    }

    function addRoutes(routes) {
        routes.forEach(route => addRoute(route))
    }
    function resolveMatcher(route) {
        let matched = []
        // /a /b / /about
        let matcher = matchers.find(m => m.path === route.path);

        while (matcher) {
            matched.unshift(matcher.record);
            matcher = matcher.parent
        }
        return {
            path: route.path,
            matched
        }

    }
    addRoutes(routes);

    return {
        addRoutes,
        matchers,
        resolveMatcher,
        addRoute // vue中动态路由添加 ，就是调用此addRoute添加路由
    }
}

const START_LOCATION_STATE = { // 这是开始的状态
    path: '/',
    matched: [],
    query: {},
    params: {}
}

export function createRouter(options) {
    let { routes, history } = options;
    let ready = false;
    // 根据history 模式 获取路径在matchers 中进行匹配，匹配后渲染组件  路径需要是响应式的
    const { addRoute, addRoutes, resolveMatcher } = createRouterMatcher(routes)
    // matchers = [{path,record,parent,children}]
    // history = {location,state,push,replace,listen}

    let currentRoute = shallowRef(START_LOCATION_STATE); // $route


    if (currentRoute.value === START_LOCATION_STATE) { // 用户一加载
        push(history.location); // 根据用户当前的路径做一次匹配操作
        // :to="/xxx"  :to=:"{path:'/xxx'}"
    }

    let reactiveRoute = {}; // 这种方式可以将对象里面的属性全部变成计算属性
    for (let key in START_LOCATION_STATE) {
        reactiveRoute[key] = computed(() => currentRoute.value[key])
    }


    function useCallbacks(){
        const handlers = [];
        return {
            list:()=> handlers,
            add:(cb)=> handlers.push(cb)
        }
    }
    const beforeGuards = useCallbacks()
    const beforeResolveGuards = useCallbacks()
    const afterEachGuards = useCallbacks()

    function resolve(to) {
        if (typeof to === 'string') {
            to = { path: to }
        }
        return resolveMatcher(to) // 当前的路径是什么 匹配到的结果是什么
    }
    function markReady() {
        if (ready) return;
        ready = true;
        history.listen((to) => {

            // 监听用户前进后退事件，再次放生跳转逻辑，更新当前的currentRoute
            let targetLocation = resolve(to);
            const from = currentRoute.value; // from
            finalNavigation(targetLocation, from, true);
        })
    }

    function finalNavigation(to, from, replaced) {
        if (from === START_LOCATION_STATE || replaced) { // 第一次是replace模式
            history.replace(to.path);
        } else {
            history.push(to.path); // 后续都是push模式
        }
        currentRoute.value = to;

        markReady();

    }

    function extractRecords(to,from){
        const leavingRecords = [];
        const updatingRecords = [];
        const enteringRecords = [];
        let len =  Math.max(to.matched.length,from.matched.length)
        for(let i = 0 ;i < len;i++){
            let fromMatched = from.matched[i];
            let toMatched = to.matched[i];
            if(fromMatched){
                // 1） 可能是更新  来的和去的一样说明要更新 
                // 2) 来的和去的不一样说明要离开
                if(to.matched.find(record => record.path === fromMatched.path)){
                    updatingRecords.push(fromMatched)
                }else{
                    leavingRecords.push(fromMatched)
                }
            }
            if(toMatched){ // 来的和要去的不一样就要走进入的逻辑 
                if(!from.matched.find(record => record.path === toMatched.path)){
                    enteringRecords.push(toMatched)
                } 
            }
        }
        return [leavingRecords,updatingRecords,enteringRecords]
    }

    function gardToPromise(guard,to,from){
        return ()=> new Promise((resolve,reject)=>{
            const next = ()=> resolve()
            // 用户可以主动调用next向下执行 
            // 也可以等待钩子执行完毕后，自动往下走
            return  Promise.resolve(guard(to,from,next)).then(next);
        })
    }
    function extractComponentGuards(records,guardType,to,from){
        const guards = []
        for(let i = 0; i < records.length;i++){
            let Comp = records[i].components.default
            let guard =  Comp[guardType];
            guard && guards.push(gardToPromise(guard,to,from))
        }
        return guards;
    }

    function runQueue(guards){ // 如何让promise链在一起
        return guards.reduce((p,guard)=>{ // 链式调用
            return p.then(()=>guard())
        },Promise.resolve())
    }
    function navigateBefore(to,from){
        // 收集离开的钩子和更新的钩子进入的钩子

        let [leavingRecords,updatingRecords,enteringRecords] = extractRecords(to,from)

        leavingRecords = leavingRecords.reverse()
        let leaveGuards = extractComponentGuards(leavingRecords,'beforeRouteLeave',to,from);

        return  runQueue(leaveGuards).then(()=>{
            let guards = []
            for(let guard of beforeGuards.list()) {
                guards.push(gardToPromise(guard,to,from))
            };
            return runQueue(guards)
        }).then(()=>{
            let updateRecords = extractComponentGuards(updatingRecords,'beforeRouteUpdate',to,from);
            return runQueue(updateRecords)
        }).then(()=>{
            let guards = []
            to.matched.forEach(record=> {
                if(record.beforeEnter){
                    guards.push(gardToPromise(record.beforeEnter,to,from))
                }
            });
            return runQueue(guards)
        }).then(()=>{
            let enterRecords = extractComponentGuards(enteringRecords,'beforeRouteEnter',to,from);
            return runQueue(enterRecords)
        })  

        // ..... promise的用法




    }
    function push(to) {
        const targetLocation = resolve(to);  // to , from 
        const from = currentRoute.value; // from

        // 更新currentRoute 这个属性是响应式的
        // 先走钩子 在进行真实的跳转
        navigateBefore(targetLocation,from).then(()=>{
            return  finalNavigation(targetLocation, from);
        }).then(()=>{ // afterEach
            for(let guard of afterEachGuards.list()) {
                guard(to,from)
            }
        })
        

       

    }
    const router = { // $router
        push,
        install(app) {
            let router = this;
            app.config.globalProperties.$router = router;
            Object.defineProperty(app.config.globalProperties, '$route', {
                get: () => unref(currentRoute)
            })
            // vue3 注册到组件中，组件可以通过inject API实现注入
            app.provide('router', router);
            app.provide('route', currentRoute)
            app.component('RouterLink', {
                props: {
                    to: {}
                },
                setup(props, { slots }) {
                    const router = inject('router')
                    const navigate = () => {
                        router.push(props.to);
                    }
                    return () => <a onClick={navigate}>{slots.default()}</a>
                }
            })
            // 使用matched 来渲染内容

            // router-view 0  1      router-view  1 2
            // matched 来匹配对应的层级  ['/']
            app.component('RouterView', {
                setup(props, { slots }) {
                    const depth = inject('depth', 0)
                    provide('depth', depth + 1)

                    const currentRoute = inject('route')
                    const computedRecord  = computed(()=> currentRoute.value.matched[depth]);

                    return () => {
                        let record = computedRecord.value;
                        const Comp = record?.components.default
                        if (!Comp) {
                            return h(Comment)
                        } else {
                            return h(Comp)
                        }
                    }
                }
            })
        },
        beforeEach:beforeGuards.add,
        beforeResolve:beforeResolveGuards.add,
        afterEach:afterEachGuards.add

    }
    return router;
}

// beforeEach 全局的
// beforeResolve 全局的
// afterEach 全局的