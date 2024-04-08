const joi = require('joi')//新版本

const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布','草稿').required()
const Id = joi.number().integer().min(1).required()

exports.addArticle_schema = { body: { title ,cate_id,content,state}}

exports.updateArticle_schema = { body: { Id,title ,cate_id,content,state}}
