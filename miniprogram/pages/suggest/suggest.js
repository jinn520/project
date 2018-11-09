// pages/suggest/suggest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAunt: false,
    news: [],
    startDatePri: '',
    endDatePri: '',
    date: '',
    counts: '',
    allPerson: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    if (app.globalData[0]['rolesid'] == 2){
      this.setData({
        isAunt: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.isAunt == true){
      var date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let days = new Date(year, month ,0).getDate()
      this.setData({
        startDatePri: year + "-" + this.isAddZero(month) + "-" + "01",
        endDatePri: year + "-" + this.isAddZero(month) + "-" + this.isAddZero(days),
        date: year + "-" + this.isAddZero(month) + "-" + this.isAddZero(day)
      })
      let takeDate = {
        date: this.data.date
      }
      this.queryStopmeal(takeDate)
    }
  },

  isAddZero: function (arr) {
    if (arr < 10)
      arr = '0' + arr
    return arr
  },

  bindDateChange: function(e){
    this.setData({
      date: e.detail.value,
      news: []
    })
    let takeDate = {
      date: e.detail.value
    }
    this.queryStopmeal(takeDate)
  },

  queryStopmeal: function (takeDate){
    var that = this
    wx.request({
      url: 'https://jinn520.club/stopmeal/getCountsByDate',
      data: takeDate,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        let num = 0
        let i = 0
        let allStopmeal = []
        for (let index in res.data) {
          if(res.data[index]["sign"] == 1){
            allStopmeal.push({
              name: res.data[index]["name"],
              sign: "停餐",
              things: res.data[index]["things"]
            })
          }else i++
          num++
        }
        that.setData({
          news: allStopmeal,
          counts: i,
          allPerson: num
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let takeDate = {
      date: this.data.date
    }
    this.queryStopmeal(takeDate)
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