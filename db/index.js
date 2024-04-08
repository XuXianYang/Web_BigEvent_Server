// 创建数据库管理模块

// 安装：npm i mysql@2.18.1 并导入mysql
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host : '127.0.0.1', //数据库的IP地址
    user : 'root', //登录数据库的账号
    password : 'xxy19691215', //登录数据库的密码
    database : 'my_db_01' //数据库的名字，指定操作哪个数据库
})

// 测试数据库是否连接成功
/*
db.query('SELECT 1',function(error,results){
    console.log(error);
    console.log(results);
})
*/
module.exports = db