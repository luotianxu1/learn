import dva from 'dva'
import createHistory from 'history/createBrowserHistory'
import RouterConfig from './router'
import voteModel from './store/voteModel'

const app = dva({
    history: createHistory(),
})

app.use({})
app.model(voteModel)
app.router(RouterConfig)
app.start('#root')
