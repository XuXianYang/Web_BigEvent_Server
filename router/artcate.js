
// 封装express的路由模块：文章分类

// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

//导入文章分类的路由处理模块
const cateHandler = require('../router_handler/artcate')
// 导入验证表单数据的中间件
const expressjoi = require('@escook/express-joi')
// 导入表单规则对象
const {artCate_schema,delete_cate_schema,update_cate_schema} = require('../schema/artcate')

// 获取文章分类
router.get('/cates',cateHandler.getCates)
// 新增文章分类
router.post('/addCates',expressjoi(artCate_schema),cateHandler.addCates)
// 根据id删除文章分类：/deletecate/:id 
router.get('/deletecate/:id',expressjoi(delete_cate_schema),cateHandler.deleteCateById)
// 根据 Id 获取文章分类
router.get('/cates/:id',expressjoi(delete_cate_schema),cateHandler.getCateById)
// 根据 Id 更新文章分类
router.post('/updatecate',expressjoi(update_cate_schema),cateHandler.updatecate)

// 将路由对象共享出去
module.exports = router