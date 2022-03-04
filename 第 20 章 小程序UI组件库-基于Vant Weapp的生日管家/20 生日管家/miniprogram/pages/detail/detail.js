// pages/detail/detail.js
// 引用公共JS文件
const utils = require('../../utils/utils.js')
// 对云数据库的声明
const db = wx.cloud.database()
const birthday = db.collection('birthday')
Page({
  /**
   * 生命周期函数 -- 监听页面加载
   */
  onLoad: function (options) {
    // 获取从首页传来的参数
    const {
      id,
      n2
    } = options
    // 更新页面数据
    this.setData({
      id,
      n2
    })
  },
  /**
   * 生命周期函数 -- 监听页面显示
   */
  onShow: function () {
    // 获取当前好友 id
    const id = this.data.id
    // 从云数据库中查找当前好友信息
    birthday.doc(id).get({
      success: res => {
        // 获取当前日期
        const today = utils.getToday()
        // 获取生日（带年份）
        const b_day = res.data.birthday
        // 计算距离出生的天数
        const n1 = utils.dateDiff(b_day, today)
        // 更新页面数据
        this.setData({
          info: res.data,
          n1
        })
      }
    })
  },

  /**
   * 自定义函数 -- 编辑好友信息
   */
  editFriend: function () {
    // 获取当前好友 id
    const id = this.data.id
    // 跳转到编辑页面并携带参数id
    wx.navigateTo({
      url: `../edit/edit?id=${id}`
    })
  },

  /**
   * 自定义函数 -- 删除好友
   */
  deleteFriend: function () {
    // 获取当前好友id
    const id = this.data.id
    // 删除当前好友
    birthday.doc(id).remove({
      success: res => {
        // 删除成功后返回上一页
        wx.navigateBack()
      }
    })
  }
})