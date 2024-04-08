// 定义用户中心的路由

// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数
const userinfoHandler = require('../router_handler/userinfo')
// 导入验证表单数据的中间件
const expressjoi = require('@escook/express-joi')
// 导入表单规则对象
const {usrinfo_schema,usrinfo_pwd_schema,usrinfo_avatar_schema} = require('../schema/userinfo')

// 获取用户信息的路由
router.get('/userinfo',userinfoHandler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo',expressjoi(usrinfo_schema),userinfoHandler.updateUserInfo)

// 更新用户密码的路由
router.post('/updatepwd',expressjoi(usrinfo_pwd_schema),userinfoHandler.updatePassword)

// 更新用户密码的路由
router.post('/update/avatar',expressjoi(usrinfo_avatar_schema),userinfoHandler.updateAvatar)

// 将路由对象共享出去
module.exports = router