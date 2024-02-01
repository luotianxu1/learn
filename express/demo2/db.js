const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// 结合MySQL数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Ltx444444444',
    database: 'auth',
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack)
        return
    }
})

connection.query('select  * from student', (err, results, fields) => {
    if (err) throw err
    // 定义POST请求的路由
    app.post('/api', (req, res) => {
        res.send(results)
    })

    // 定义POST请求的路由
    app.get('/api', (req, res) => {
        res.send(results)
    })

    // 启动服务器
    app.listen(3000, () => {
        console.log('Server started on port 3000')
    })
})

connection.end((err) => {
    if (err) {
        console.error('Error closing MySQL database connection: ' + err.stack)
        return
    }
    console.log('MySQL database connection closed')
})

/**
 * 
-- 创建学生表
CREATE TABLE IF NOT EXISTS `student` (
    `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
    `name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
    `pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT '密码',
    `sex` VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
    `birthday` DATETIME DEFAULT NULL COMMENT '出生日期',
    `address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
    `email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 插入测试数据


INSERT INTO `student` (`name`, `pwd`, `sex`, `birthday`, `address`, `email`) VALUES
('张三', 'password1', '男', '1990-01-01', '北京市', 'zhangsan@example.com'),
('李四', 'password2', '女', '1992-03-15', '上海市', 'lisi@example.com'),
('王五', 'password3', '男', '1995-05-20', '广州市', 'wangwu@example.com'),
('赵六', 'password4', '女', '1998-07-10', '深圳市', 'zhaoliu@example.com'),
('刘七', 'password5', '男', '2000-09-25', '天津市', 'liuqi@example.com'),
('陈八', 'password6', '女', '2002-12-08', '南京市', 'chenba@example.com'),
('张九', 'password7', '男', '2005-02-14', '成都市', 'zhangjiu@example.com'),
('李十', 'password8', '女', '2008-04-30', '重庆市', 'lishi@example.com'),
('王十一', 'password9', '男', '2010-06-18', '武汉市', 'wangshiyi@example.com'),
('赵十二', 'password10', '女', '2013-08-22', '西安市', 'zhaoshier@example.com');
 */
