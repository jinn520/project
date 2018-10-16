// pages/judge/judge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentName: [],
    userinfo: [],
    partuserinfo: [],
    openid:null,
    name:null
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
          success(res) {
            // console.log(res.data)
            wx.showToast({
              title: '正在加载',
              icon: 'loading',
              duration: 500,
              mask: true
            })
            setTimeout(function () {
              if (!res.data) {
                wx.redirectTo({
                  url: '../index/index'
                })
              }
            }, 500)
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
    var that=this
    wx.request({
      url: 'https://jinn520.club/department',//查找部门信息
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
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
          for (var index in res.data) {
            middata2.push({ departmentid: res.data[index]["departmentid"], name: res.data[index]["name"] })
          }
          that.setData({
            userinfo: middata2,
          })
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
    console.log(this.data.openid)
    console.log("选择的名字是： " + this.data.userinfo[e.detail.value]["name"])
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