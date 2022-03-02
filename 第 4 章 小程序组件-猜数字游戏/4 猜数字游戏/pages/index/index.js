Page({
  goToGame() {
    wx.navigateTo({
      url: '../game/game',
    })
  },
  goToAbout() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  goToRules() {
    wx.navigateTo({
      url: '../rules/rules',
    })
  }
})