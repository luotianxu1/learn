const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const fs = require('fs')
// const router = require('./routes/student')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(fileUpload())
app.use(express.json())
app.use(cors())
// app.use('/student', router)
app.use('/student', require(path.join(__dirname, 'routes', 'student')))
app.use(express.static('resource'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/upload', (req, res) => {
    // 1、文件上传上来
    // 移动至指定文件夹
    let fileObject = null
    let filePath = ''

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({
            message: '上传失败！',
            code: 500,
        })
        return
    }

    fileObject = req.files.file
    filePath = './upload/' + fileObject.name

    // 得到具体路径
    const fileFolder = path.join(__dirname, './upload/')

    // 检查upload文件夹是否存在，如果不存在则创建
    if (!fs.existsSync(fileFolder)) {
        // 创建指定目录
        fs.mkdirSync(fileFolder)
    }

    fileObject.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send({
                code: 1,
                msg: 'System error',
            })
        }
        res.send({
            code: 200,
            data: 'Upload Successfully',
        })
    })
})

app.get('/download', function (req, res) {
    const file = {
        name: '1.png',
        path: './upload/1.png',
    }
    let exist = fs.existsSync(path.resolve(file.path))
    if (exist) {
        res.download(file.path)
    } else {
        res.send({
            code: 1,
            msg: 'File Not Exits',
        })
    }
})

app.listen(3001, () => {
    console.log('Express app at:http://localhost:3001')
})
