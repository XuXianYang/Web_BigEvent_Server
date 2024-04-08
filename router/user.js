
// 封装express的路由模块：用户登录、注册

// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入用户的路由处理模块
const userHandler = require('../router_handler/user')
// 导入验证表单数据的中间件
const expressjoi = require('@escook/express-joi')
// 导入表单规则对象
const {reg_login_schema} = require('../schema/user')

// 注册
router.post('/reguser',expressjoi(reg_login_schema),userHandler.regUser)
// 登录
router.post('/login',expressjoi(reg_login_schema),userHandler.login)

// 将路由对象共享出去
module.exports = router