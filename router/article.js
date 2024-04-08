// 封装express的路由模块：文章

// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入文章的路由处理模块
const articleHandler = require('../router_handler/article')
// 导入验证表单数据的中间件
const expressjoi = require('@escook/express-joi')
// 导入表单规则对象
const {addArticle_schema,updateArticle_schema} = require('../schema/article')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') ,})

// 新增文章
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add',upload.single('cover_img'),expressjoi(addArticle_schema),articleHandler.addArticle)
// 获取文章列表
router.get('/getArticle',articleHandler.getArticleList)
// 根据id删除文章
router.get('/deleteArt/:id',articleHandler.deleteArtById)
// 根据 Id 获取文章
router.get('/getArticle/:id',articleHandler.getArticleById)
// 根据 Id 更新文章
router.post('/updateArticle',upload.single('cover_img'),expressjoi(updateArticle_schema),articleHandler.updateArticleById)

// 将路由对象共享出去
module.exports = router