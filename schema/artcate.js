const joi = require('joi')//新版本

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.artCate_schema = {body:{name,alias}}

exports.delete_cate_schema = { params: { id }}

exports.update_cate_schema = { body: { Id:id ,name,alias}}