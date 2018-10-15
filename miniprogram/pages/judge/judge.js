// pages/judge/judge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        wx.request({
          url: 'https://jinn520.club/user/we', 
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            wx.showToast({
              title: '正在加载',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
            setTimeout(function () {
              if (!res.data) {
                wx.redirectTo({
                  url: '../index/index'
                })
              }
            }, 1000)
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    setTimeout(function () {
      wx.request({
        url: 'https://jinn520.club/user/wxname',
        method: 'GET',
        success(res) {
          console.log(res.data);
        }
      })
    }, 1500)
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

  }
})