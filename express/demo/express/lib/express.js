const ApplicationCation = require('./application')

// 1、实现当前的应用和创建应用分离
function createApplication() {
    return new ApplicationCation()
}

module.exports = createApplication
