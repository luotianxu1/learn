import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { bindActionCreators } from 'redux'

const ThemeContext = createContext()

// Provider: 把传递进来的store放在跟组件的上下文中
export function provider(props) {
    let { store, children } = props
    return (
        <ThemeContext.Provider value={{ store }}>
            {children}
        </ThemeContext.Provider>
    )
}

// connect:获取上写文中的store，然后把公共状态、要派发的方法等，都基于属性传递给需要渲染的组件，把让组件更新的方法放在redux事件池中
export function connect(mapStateToProps, mapDispatchToProps) {
    // 处理默认值
    if (!mapStateToProps) {
        mapStateToProps = () => {
            return {}
        }
    }
    if (!mapDispatchToProps) {
        mapDispatchToProps = (dispatch) => {
            return {
                dispatch,
            }
        }
    }
    return function currying(Component) {
        // Componet:最终要渲染的组件
        // HOC:我们最后基于export default导出的组件
        return function HOC(props) {
            // 我们需要获取上下文中的store
            let { store } = useContext(ThemeContext)
            let { getState, dispatch, subscribe } = store

            // 向事件池中加入组件更新的办法
            let [, forUpdate] = useState(0)
            useEffect(() => {
                let unsubscribe = subscribe(() => {
                    forUpdate(+new Date())
                })
                return () => {
                    // 组件释放的时候执行,把放在事件池中的函数移除掉
                    unsubscribe()
                }
            }, [])

            // 把mapStateProps/mapDispatchToProps，把执行的放回值，作为属性传递给组件
            let state = getState()
            let nextState = useMemo(() => {
                return mapDispatchToProps(state)
            }, [state])

            let dispatchProps = {}
            if (typeof mapDispatchToProps === 'function') {
                // 是函数直接执行即可
                dispatchProps = mapDispatchToProps(dispatch)
            } else {
                // 是actionCreator对象，需要经过bindActionCreators处理
                dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
            }

            return (
                <Component
                    {...props}
                    {...nextState}
                    {...dispatchProps}
                ></Component>
            )
        }
    }
}
