// pages/judge/judge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentName: [],
    userinfo: [],
    partuserinfo: [],
    openid: '',
    name:null,
    index:0
  },

  onLoad: function(){
    wx.showToast({
      title: '请绑定用户',
      mask:'true'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    const app = getApp()
    this.setData({
      openid: app.globalData.openid
    })
    wx.request({
      url: 'https://jinn520.club/department',//查找部门信息
      method: "GET",
      success(res) {
        var middata = []
        for (var index in res.data) {
          middata.push({ id: res.data[index]["id"], name: res.data[index]["name"] })
        }
        that.setData({
          departmentName: middata
        })
      }
    })
    setTimeout(function () {
      wx.request({
        url: 'https://jinn520.club/user/wxname',//获取到所有没有绑定微信的用户信息
        method: 'GET',
        success(res) {
          var middata2 = []
          var middate3 = []
          for (var index in res.data) {
            middata2.push({ departmentid: res.data[index]["departmentid"], name: res.data[index]["name"] })
            if (res.data[index]["departmentid"] == that.data.departmentName[0]["id"]){
              middate3.push({ departmentid: res.data[index]["departmentid"], name: res.data[index]["name"] })
            }
          }
          that.setData({
            userinfo: middata2,
            partuserinfo: middate3
          })
          console.log(that.data)
        }
      })
    }, 200)

  },
  bindChange: function (e) {
    var middledata = []
    for(var index in this.data.userinfo){
      if (this.data.userinfo[index]["departmentid"] == this.data.departmentName[e.detail.value]["id"]){
        middledata.push(this.data.userinfo[index])
      }
    }
    this.setData({
      partuserinfo: middledata
    })
  },

  bindChange2: function (e) {
    this.setData({
      name: this.data.userinfo[e.detail.value]["name"]
    })
  },

  addwxname: function () {
    var addwxnameinfo
    if(this.data.name!=null){
      addwxnameinfo = {
        wxname: this.data.openid,
        name: this.data.name
      }
    }
    else {
      addwxnameinfo = {
        wxname: this.data.openid,
        name: this.data.partuserinfo[0]["name"]
        }
    }
    console.log(addwxnameinfo);
    wx.request({
      url: 'https://jinn520.club/user/addwxname',
      method: 'POST',
      data: addwxnameinfo,
      success: function (res) {
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function (res) {
        console.log(res);
      },
    })
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