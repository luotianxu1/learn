const { APP_PORT } = require('./config/config_default')

const app = require('./app/index')

app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}`)
})
