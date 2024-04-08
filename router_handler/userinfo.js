
// 定义用户信息模块的路由处理函数

// 导入数据库管理模块
const db = require('../db/index')
// 导入密码加密模块
const bcryptjs = require('bcryptjs')

// 获取用户信息的路由的处理函数
exports.getUserInfo = function (req, res) {

    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    // 查找用户
    db.query(sql, req.user.id, function (err, result) {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('用户名不存在')
        res.send({ status: 0, message: '获取用户信息成功', data: result[0] })
    })
}

// 更新用户信息的路由的处理函数
exports.updateUserInfo = function (req, res) {
    const sql = 'update ev_users set ? where id=?'
    // 更新用户信息
    db.query(sql, [req.body,req.user.id], function (err, result) {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新用户信息失败')
        res.cc('更新用户信息成功',0)
    })
}

// 更新用户密码的路由的处理函数
exports.updatePassword = function (req, res) {
    // 查询用户是否存在
    const sql1 = 'select * from ev_users where id=?'
    db.query(sql1, req.user.id, function (err, result) {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('用户不存在')
        
        // 比较客户端上送的密码和数据库的密码
        let isTrue = bcryptjs.compareSync(req.body.oldPwd,result[0].password)
        if(!isTrue) return res.cc('旧密码不正确')

        const sql = 'update ev_users set password=? where id=?'
        // 加密新密码
        const password = bcryptjs.hashSync(req.body.newPwd,10)
        // 更新用户信息
        db.query(sql, [password,req.user.id], function (err, result) {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('更新用户密码失败')
            res.cc('更新用户密码成功',0)
        })
    })
}

// 获取用户头像的路由的处理函数
exports.updateAvatar = function (req, res) {
    const sql = 'update ev_users set user_pic=? where id=?'
    // 更新用户头像
    db.query(sql, [req.body.avatar,req.user.id], function (err, result) {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新用户头像失败')
        res.cc('更新用户头像成功',0)
    }) 
    res.cc('更新用户头像成功',0)
}