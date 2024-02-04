const Service = require('egg').Service

class ProduteService extends Service {
    async index() {
        return {
            id: 100,
            name: '测试',
            list: [
                {
                    id: 1,
                    name: '张三',
                },
            ],
        }
    }
}

module.exports = ProduteService
