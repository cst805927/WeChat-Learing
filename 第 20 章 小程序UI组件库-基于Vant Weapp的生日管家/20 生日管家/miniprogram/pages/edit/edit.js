// pages/edit/edit.js
// 对云数据库的声明
const db = wx.cloud.database()
const birthday = db.collection('birthday')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '点击设置生日'
    }
})