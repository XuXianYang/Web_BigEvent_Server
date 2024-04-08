
const joi = require('joi')//新版本

/*
string() 值必须是字符串
alphanum() 值只能是包含 a-zA-Z0-9 的字符串
min(length) 最小长度
max(length) 最大长度
required() 值是必填项，不能为 undefined
pattern(正则表达式) 值必须符合正则表达式的规则
*/
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

// 导出表单验证的规则对象
// 表示需要对 req.body 中的数据进行验证
exports.usrinfo_schema = { body: {nickname, email } }

exports.usrinfo_pwd_schema = {
    body: {
        oldPwd: password,
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

exports.usrinfo_avatar_schema = { body: { avatar } }
