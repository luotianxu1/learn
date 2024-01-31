const ApplicationCation = require('./application')
const Router = require('./router/index')

// 1、实现当前的应用和创建应用分离
function createApplication() {
    return new ApplicationCation()
}

createApplication.Router = Router

module.exports = createApplication
