
// 导入定义表单验证对象的三方包
// const joi = require('@hapi/joi')//这个版本已废弃
const joi = require('joi')//新版本

/*
string() 值必须是字符串
alphanum() 值只能是包含 a-zA-Z0-9 的字符串
min(length) 最小长度
max(length) 最大长度
required() 值是必填项，不能为 undefined
pattern(正则表达式) 值必须符合正则表达式的规则
*/ 
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 导出表单验证的规则对象
// 表示需要对 req.body 中的数据进行验证
exports.reg_login_schema = {body:{username,password}}