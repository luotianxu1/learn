// 当用户登陆后 返回一个标识cookie
let express = require('express')
let app = express()
let path = require('path') // 帮我们拼接路径

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname)))

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })) // a=1&b=2 = {a:1,b:2} = req.body
let cookieParse = require('cookie-parser')
app.use(cookieParse())

let userList = [
    { username: 'luo', password: 'luo' },
    { username: 'tian', password: 'tian' },
]

let SESSION_ID = 'connect.sid'
let session = {}

app.post('/api/login', function (req, res) {
    let { username, password } = req.body
    let user = userList.find(
        (user) => user.username === username && user.password === password
    )
    if (user) {
        // 服务器需要在用户登陆后 给一个信息
        let cardId = Math.random() + Date.now()
        session[cardId] = { user }
        res.cookie(SESSION_ID, cardId, { httpOnly: true })
        res.json({
            code: 0,
        })
    } else {
        res.json({
            code: 1,
            error: '用户不存在',
        })
    }
})

// 反射型 http://localhost:3000/welcome?type=<script>alert(document.cookie)</script>
// 部分发现路径存在异常 会有xss屏蔽功能
// 传输的时候加入httpOnly: true 让cookie在前端不可以获取，并不是解决xss的方案，只是降低受损的范围
// 诱导用户自己点开（一次性）
// 查询参数 可以加上encodeURIComponent方式决解
app.get('/welcome', function (req, res) {
    // res.send(`${req.query.type}`)
    res.send(`${encodeURIComponent(req.query.type)}`)
})

// 用户评论信息
let comments = [{ username: 'luo', content: '欢迎' }]
app.get('/api/list', function (req, res) {
    res.json({ code: 0, comments })
})

// xss 存储型 恶意脚本存储到服务器上，所有人访问都会造成攻击，比反射型和DOM-Base范围更大
app.post('/api/addcomment', function (req, res) {
    // 添加留言
    let r = session[req.cookies[SESSION_ID]] || {}
    let user = r.user
    if (user) {
        comments.push({ username: user.username, content: req.body.content })
        res.json({ code: 0 })
    } else {
        res.json({ code: 1, error: '用户未登陆' })
    }
}),
    app.listen(3000)
