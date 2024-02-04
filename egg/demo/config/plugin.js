/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    mysql: {
        package: 'egg-mysql',
        enable: true,
    },
    cors: {
        package: 'egg-cors',
        enable: true,
    },
}
