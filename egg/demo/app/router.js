/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app
    router.get('/', controller.home.index)
    //
    router.get('/list', controller.hello.index)
    router.get('/listDetailQuery', controller.hello.listDetail)
    router.get('/listDetailParams/:id/:name', controller.hello.listDetailParams)
    router.get('/listDetailParams/:id/:name', controller.hello.listDetailParams)
    //
    router.post('/listDetailPost', controller.learning.index)
    //
    router.all('/listDetailPost', controller.learning.index)
    router.get('/user/list', controller.user.list)
}
