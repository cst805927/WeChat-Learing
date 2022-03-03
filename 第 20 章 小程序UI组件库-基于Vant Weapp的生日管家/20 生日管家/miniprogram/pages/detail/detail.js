// pages/detail/detail.js
// 引用公共JS文件
const utils = require('../../utils/utils.js')
// 对云数据库的声明
const db = wx.cloud.database()
const birthday = db.collection('birthday')
Page({})