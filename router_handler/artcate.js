
// 导入数据库管理模块
const db = require('../db/index')

// 获取文章分类
exports.getCates = function (req, res) {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, function (err, result) {
        if (err) return res.cc(err)
        res.send({ status: 0, msg: '获取文章分类成功', data: result })
    })
}

// 添加文章分类
exports.addCates = function (req, res) {
    const sql = 'select * from ev_article_cate where name=? OR alias=?'
    // 查询是否有相同的分类或者别名
    db.query(sql, [req.body.name, req.body.alias], function (err, result) {
        if (err) return res.cc(err)
        if (result.length > 0) return res.cc('分类名称或者别名已存在')
        // 添加分类
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, function (err, result) {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('文章分类添加失败')
            res.cc('文章分类添加成功', 0)
        })
    })
}

// 根据id删除文章分类
exports.deleteCateById = function (req, res) {
    const sql = 'update ev_article_cate set is_delete=1 where Id=?'
    // 更新文章分类的删除标记为1
    db.query(sql, req.params.id, function (err, result) {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc('删除文章分类成功', 0)
    })
}

// 根据id获取文章分类
exports.getCateById = function (req, res) {
    const sql = 'select * from ev_article_cate where Id=?'
    db.query(sql, req.params.id, function (err, result) {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取文章分类失败')
        res.send({ status: 0, msg: '获取文章分类成功', data: result[0] })
    })
}

// 根据id更新文章分类
exports.updatecate = function (req, res) {
    const sql = 'select * from ev_article_cate where Id<>? and (name=? OR alias=?)'
    // 查询是否有相同的分类或者别名
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], function (err, result) {
        if (err) return res.cc(err)
        if (result.length > 0) return res.cc('分类名称或者别名已存在')
        // 更新文章分类
        const sql = 'update ev_article_cate set ? where Id=?'
        db.query(sql, [req.body, req.body.Id], function (err, result) {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('更新文章分类失败')
            res.cc('更新文章分类成功', 0)
        })
    })
}

