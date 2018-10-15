// pages/addUser/addUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{id:1,name:"12"},{id:2,name:"qwe"}],
    departmentName:[],
    isclick:false
  },

cli: function () {
  this.setData({
    isclick: true
  })
  console.log(this.data.departmentName);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        console.log(res.data)
        for(var index in res.data){
          that.data.departmentName.push({id:res.data[index]["id"],name:res.data[index]["name"]})
        }
        console.log(that.data.departmentName)
      }
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