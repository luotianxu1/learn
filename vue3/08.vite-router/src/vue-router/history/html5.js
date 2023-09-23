function createCurrentLocation(bases = ''){
    let {pathname,search,hash} = location;

    if(bases.startsWith('#')){ // #   ->  /
      return  hash.slice(1) || '/'
    }

    return pathname + search + hash
}
function buildState(back,current,forward,replaced = false,computedScroll = false){
    return {
        back,
        current,
        forward,
        replaced,
        scroll:computedScroll ? {left:window.pageXOffset,top:window.pageYOffset} : null
    }
}
function useHistoryStateNavigation(bases){
    const currentLocation = {
        value:createCurrentLocation(bases) // 当前维护的路径
    }; // 字符串具有不变性

    const currentState = {
        value:history.state // 维护状态
    }
    function changeLocation(to,state,replaced){
        history[replaced ? 'replaceState':'pushState'](state,'',bases  + to);
        currentLocation.value = to;
        currentState.value = state;
    }
    if(!currentState.value){ // 发生跳转存入状态
        changeLocation(currentLocation.value, buildState(null,currentLocation.value,null,true),true);
    }
    function push(to,data){
        // 做push的时候  要有两个状态  跳转前 跳转后
        const state1 = {
            ...currentState.value,
            ...{
                forward:to,scroll:{left:window.pageXOffset,top:window.pageYOffset}
            }
        }
        changeLocation(currentLocation.value,state1,true)
        // 跳转前。。。。
        let state2 = {
            ...buildState(currentLocation.value,to,null),
            ...data
        } 
        // 跳转后。。。
        changeLocation(to,state2,false); // 用pushState真正跳转

    }
    function replace(to,data){
        let state = { // 构建一个全新的状态 替换当前的路径， 自定义的数据添加进去
            ...buildState(
                currentState.value.back,
                to,
                currentState.value.forward,
                true
            ),
            ...data
        }
        changeLocation(to,state,true); // 跳转
    }
    return {
        location:currentLocation,
        state:currentState,
        push,
        replace
    }
}

function useHistoryListener(currentLocation,currentState){
    let listeners = [];
    function listen(callback){
        listeners.push(callback)
    }
    window.addEventListener('popstate',({state})=>{
        const from = currentLocation.value;
        currentLocation.value = createCurrentLocation();
        currentState.value = state;
        listeners.forEach(listener=>listener(currentLocation.value,from,state))
    })
    return {listen}
}
export function createWebHistory(base = ''){
    // 1） 实现维护路径和状态 
    const historyNavigation = useHistoryStateNavigation(base)
    
    // 2）监听前进后退事件
    const historyListeners= useHistoryListener(historyNavigation.location,historyNavigation.state);
 
    const routerHistory = {
        ...historyNavigation,
        ...historyListeners
    }
    // 只需要对这两个属性做个劫持
    Object.defineProperty(routerHistory,'location',{
        get:()=> historyNavigation.location.value
    })
    Object.defineProperty(routerHistory,'state',{
        get:()=> historyNavigation.state.value
    })
 
    return routerHistory
}
