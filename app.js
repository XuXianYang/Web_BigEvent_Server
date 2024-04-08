// `app.js` 作为整个项目的入口文件

// 安装：npm i express@4.17.1 导入express
const express = require('express')
//安装：npm i cors@2.8.5 导入跨域中间件
const cors = require('cors')
// 导入规则对象模块，捕捉全局错误
const joiapp = require('joi')
// 导入配置文件
const config = require('./config')
// 解析token的中间件
const expressjwt = require('express-jwt')

// 创建express服务器实例
const app = express()

// 把cors注册为全局中间件
app.use(cors())
// 配置解析表单数据`application/x-www-form-urlencoded`的全局中间件
app.use(express.urlencoded({ extended: false }))

// 注册全局中间件，封装res.send()方法，放在路由注册之前
app.use(function (req, res, next) {
    // status默认值为1
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 注册全局解析token的中间件
app.use(expressjwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api|^\/uploads/] }))

// 资源托管
app.use('/uploads', express.static('./uploads'))

// 导入用户登录注册模块的路由
const userRouter = require('./router/user')
// 用户模块的路由注册为全局中间件,并挂载路由前缀api
app.use('/api', userRouter)

// 导入用户中心的路由
const userinfoRouter = require('./router/userinfo')
// 用户模块的路由注册为全局中间件,并挂载路由前缀my
app.use('/my', userinfoRouter)

// 导入文章分类的路由
const catesRouter = require('./router/artcate')
app.use('/my/article', catesRouter)

// 导入文章的路由
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

// 捕捉表单规则错误
app.use(function (err, req, res, next) {
    if (err instanceof joiapp.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () { })

