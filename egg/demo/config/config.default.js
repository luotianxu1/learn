/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {})

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1706860666186_5402'

    // add your middleware config here
    config.middleware = []

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    }

    config.security = {
        csrf: {
            enable: false,
        },
    }

    // 添加mysql连接信息
    config.mysql = {
        // 单数据库信息配置
        client: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '@Ltx444444444',
            database: 'auth',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    }

    config.logger = {
        level: 'DEBUG', // 设置日志级别为 DEBUG，以便记录所有 SQL 执行日志
        consoleLevel: 'DEBUG', // 也将 DEBUG 级别的日志输出到控制台
    }

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    }

    return {
        ...config,
        ...userConfig,
    }
}
