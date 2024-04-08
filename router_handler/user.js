// 定义用户模块的路由处理函数

// 导入数据库管理模块
const db = require('../db/index')
// 导入密码加密模块
const bcryptjs = require('bcryptjs')
// 导入生成 Token 字符串的包
const jwt = require('jsonwebtoken')
// 导入生成 Token 字符串的秘钥配置文件
const config = require('../config')

// 注册路由的处理函数
exports.regUser = function(req,res){
    const userInfo = req.body
    if(!userInfo.username || !userInfo.password){
        return res.send('用户名或者密码不能为空')
    } 
    
    const sql = 'select * from ev_users where username=?'
    // 查找用户是否已存在
    db.query(sql,userInfo.username, function(err,result){
        if(err) return res.send({status:1,msg:err.message})
        if(result.length>0) return res.send({status:1,msg:'用户名已存在'})
        // 对密码进行加密
        userInfo.password = bcryptjs.hashSync(userInfo.password,10)

        // 插入数据
        const sql = 'insert into ev_users set ?'
        db.query(sql,{ username: userInfo.username, password: userInfo.password },(err,results) => {            
            if(err) return res.send({status:1,msg:err.message})
            if(results.affectedRows!==1) return res.send({status:1,msg:'注册失败！'})
            res.send({status:0,msg:'注册成功！'})
        })
    })
}

// 登录路由的处理函数
exports.login = function(req,res){
    let userinfo = req.body

    // 查询用户名是否存在
    let sql = 'select * from ev_users where username=?'
    db.query(sql,userinfo.username,(err,results) => {
        if(err) return res.send({status:1,msg:err.message})
        if(results.length !== 1) return res.send({status:1,msg:'用户不存在'})
        // 比较客户端上送的密码和数据库的密码
        let isTrue = bcryptjs.compareSync(userinfo.password,results[0].password)
        if(isTrue){
            // 生成加密数据的对象，通过 ES6 的高级语法，快速剔除 `密码` 和 `头像` 的值
            const user = { ...results[0], password: '', user_pic: '' }
            // const user = {id:results[0].id ,username:results[0].username}
            // 生成token
            const token = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
            res.send({
                status:0,
                msg:'登录成功',
                // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                token:'Bearer ' + token
            })
        }else{
            res.send({status:1,msg:'密码错误'})
        }
    })
}