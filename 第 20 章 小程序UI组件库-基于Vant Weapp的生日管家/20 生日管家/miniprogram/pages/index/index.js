// 引用公共JS文件
const utils = require('../../utils/utils.js')
// 对云数据库的声明
const db = wx.cloud.database()
const birthday = db.collection('birthday')
Page({
  /**
   * 自定义函数 -- 添加好友信息
   */
  addFriend: function (options) {
    const id = 'new'
    wx.navigateTo({
      url: '../edit/edit?id=${id}',
    })
  },
  /**
   * 自定义函数 -- 获取好友列表
   */
  getFriendsList: function () {
    // 查找好友列表，按照出生日期升序排列
    birthday.orderBy('date', 'asc').get({
      success: res => {
        this.processData(res.data)
      }
    })
  },
  /**
   * 自定义函数 -- 处理数据（计算距离下个生日的天数）
   */
  processData: function (list) {
    for (let i = 0; i < list.length; i++) {
      // 获取不带年份的生日
      const date = list[i].date
      // 计算相差几天
      const n = utils.getNextBirthday(date)
      list[i].n = n
    }
    this.setData({
      friendsList: list
    })
  },

  /**
   * 生命周期函数 -- 监听页面显示
   */
  onShow: function () {
    // 获取好友列表
    this.getFriendsList()
  },

  /**
   * 自定义函数 -- 取消搜索
   */
  onCancel: function (e) {
    // 获取好友列表
    this.getFriendsList()
  },

  /**
   * 自定义函数 -- 搜索关键词
   */
  onChange: function (e) {
     // 获取搜索关键词
     const keyword = e.detail
     // 使用正则表达式模糊查询
     birthday.where({
       name: db.RegExp({
         regexp: keyword,
         options: 'i',
       })
     }).orderBy('date', 'asc').get({
       success: res => {
         this.processData(res.data)
       }
     })
  }

})