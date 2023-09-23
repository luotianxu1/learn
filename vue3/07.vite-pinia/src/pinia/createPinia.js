// provide
import {effectScope, ref } from 'vue'
import {symbolPinia} from './consts'
export function createPinia(){
    const scope = effectScope(); //scope.stop()
    const state = scope.run(()=> ref({})); // reactive()
    const _p = []
    const pinia = {
        install(app){
            app.provide(symbolPinia,pinia)
        },
        use(plugin){
            _p.push(plugin);
            return this;
        },
        state, // 维护所有store的状态
        _s: new Map(),
        _e: scope,
        _p
    }   
    return pinia
} 

// main : main  -> {}
// user : user  -> {}


// 一个store 对应的内容  记录所有store