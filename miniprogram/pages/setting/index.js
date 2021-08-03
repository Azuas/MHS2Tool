// pages/setting/index.js
const lightKey = 'light'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lightChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let lightValue = wx.getStorageSync(lightKey)
    if (lightValue && lightValue == '1') {
      this.setData({
        lightChecked: true
      })
    } else {
      this.setData({
        lightChecked: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 亮屏设置点击
   */
  lightChange: function () {
    let lightValue = wx.getStorageSync(lightKey)
    //取反
    if (lightValue && lightValue == '1') {
      wx.setStorageSync(lightKey, '0')
      this.setData({
        lightChecked: false
      })
      wx.setKeepScreenOn({
        keepScreenOn: false
      })
    } else {
      wx.setStorageSync(lightKey, '1')
      this.setData({
        lightChecked: true
      })
      wx.setKeepScreenOn({
        keepScreenOn: true
      })
    }
  }
})