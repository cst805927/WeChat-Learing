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
    },
    /**
     * 自定义函数 -- 更新页面上显示的出生日期
     */
    dateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    /**
     * 生命周期函数 -- 监听函数加载
     */
    onLoad: function (options) {
        // 获取携带的参数id
        const id = options.id
        // 更新id数据
        this.setData({
            id
        })
        // 如果好友已存在
        if (id !== 'new') {
            // 根据好友id从云数据库中获取好友信息
            birthday.doc(id).get({
                success: res => {
                    this.setData({
                        info: res.data,
                        date: res.data.birthday
                    })
                }
            })
        }
    },
    /**
     * 自定义函数 -- 提交表单数据
     */
    onSubmit: function (e) {
        // 获取表单中提交的全部数据
        const info = e.detail.value
        // 追加一个不带年份的生日信息
        const date = info.birthday.substring(5)
        info.date = date
        // 获取好友id
        const id = this.data.id
        // 添加新朋友
        if (id === 'new') {
            // 随机选择一个头像
            const i = Math.floor(Math.random() * 10 + 1)
            info.avatar = `/images/avatar/00${i}.png`
            // 往云数据库中添加当前好友信息
            birthday.add({
                data: info,
                success: res => {
                    // 成功后返回首页
                    wx.navigateBack()
                },
                fail: err => {
                    // 失败提示
                    wx.showToast({
                        title: "保存失败",
                    })
                }
            })
        } else {
            // 好友已存在
            // 根据好友id更新数据
            birthday.doc(id).update({
                data: info,
                success: res => {
                    // 成功后返回上一页
                    wx.navigateBack()
                },
                fail: err => {
                    // 失败提示
                    wx.showToast({
                        title: '保存失败',
                    })
                }
            })
        }
    },
    /**
     * 自定义函数 -- 取消修改并返回上一页
     */
    cancelEdit: function () {
        wx.navigateBack()
    }
})