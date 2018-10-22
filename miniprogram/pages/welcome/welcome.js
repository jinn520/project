// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: [],
    openid:''
  },

  goHome: function () {
    wx.switchTab({
      url: '../admin/admin'
    });
    wx.setStorage({
      key: 'userinfo',
      data: this.data.userinfo,
      success(res){
        // console.log("成功:"+res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        that.setData({
          openid: res.result.openid
        })
        wx.request({
          url: 'https://jinn520.club/user/' + res.result.openid, //查询该openid是否绑定用户，绑定则跳转主页，未绑定则需绑定
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(result) {
            // console.log(result.data)
            that.setData({
              userinfo: [{id: result.data.id,name: result.data.name, rolesid: result.data.rolesid, departmentid: result.data.departmentid, openid: that.data.openid}]
            })
            // console.log(that.data)
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