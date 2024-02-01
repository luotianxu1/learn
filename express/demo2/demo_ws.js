const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 4000 })

wss.on('connection', (ws) => {
    console.log('我是socket')
    ws.on('message', (data) => {
        ws.send('消息结果：' + data)
    })

    ws.on('close', () => {
        console.log('断开')
    })
})
