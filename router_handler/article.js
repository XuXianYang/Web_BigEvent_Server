
// 导入数据库管理模块
const db = require('../db/index')
// 导入处理路径的 path 核心模块
const path = require('path')

// 添加文章
exports.addArticle = function (req, res) {
    console.log(req.file);
    console.log(req.body);
    // 判断文件存在
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文件不能为空')
    const sql = 'insert into ev_articles set ?'

    // 组装报文对象
    const dataObj = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }
    db.query(sql, dataObj, function (err, result) {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('文章添加失败')
        res.cc('文章添加成功', 0)
    })
}

// 获取文章列表
exports.getArticleList = function (req, res) {
    const sql = 'select * from ev_articles where is_delete=0 order by Id asc'
    db.query(sql, function (err, result) {
        if (err) return res.cc(err)
        res.send({ status: 0, msg: '获取文章成功', data: result })
    })
}

// 根据id删除文章
exports.deleteArtById = function (req, res) {
    const sql = 'update ev_articles set is_delete=1 where Id=?'
    db.query(sql, req.params.id, function (err, result) {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('删除文章失败')
        res.cc('删除文章成功', 0)
    })
}

// 根据id获取文章
exports.getArticleById = function (req, res) {
    const sql = 'select * from ev_articles where Id=?'
    db.query(sql, req.params.id, function (err, result) {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取文章失败')
        res.send({ status: 0, msg: '获取文章成功', data: result[0] })
    })
}

// 根据id更新文章
exports.updateArticleById = function (req, res) {
    // 判断文件存在
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文件不能为空')
    // 组装报文对象
    const dataObj = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }
    // 更新文章
    const sql = 'update ev_articles set ? where Id=?'
    db.query(sql, [dataObj, req.body.Id], function (err, result) {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新文章失败')
        res.cc('更新文章成功', 0)
    })
}