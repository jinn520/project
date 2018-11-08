Page({

  data: {
    userinfo: [],
    yearPri: new Date().getFullYear(),
    monthPri: new Date().getMonth() + 1,
    dayPri: new Date().getDate(),
    hourPri: new Date().getHours(),
    startDatePri: '',
    endDatePri: '',
    startDate: '',
    endDate: '',
    sign: 0,
    checked: true,
    things: '',
    isSubmit: true
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    const app = getApp()
    this.setData({
      userinfo: app.globalData
    })
    var endDay = new Date(this.data.yearPri, this.data.monthPri, 0).getDate()
    if(this.data.hourPri >= 9){
      let daybegin = this.data.dayPri + 1
      this.setData({
        startDatePri: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + this.isAddZero(daybegin),
        endDatePri: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + endDay,
        startDate: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + this.isAddZero(daybegin),
        endDate: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + this.isAddZero(daybegin)
      })
    }else {
      this.setData({
        startDatePri: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + this.isAddZero(this.data.dayPri),
        endDatePri: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + endDay,
        startDate: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + this.isAddZero(this.data.dayPri),
        endDate: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + this.isAddZero(this.data.dayPri)
      })
    }
  },

  bindDateChange: function (e) {
    if (this.compareDate(e.detail.value, this.data.endDate)){
      this.setData({
        startDate: e.detail.value
      })
    }else {
      this.setData({
        startDate: e.detail.value,
        endDate: e.detail.value
      })
    }
  },
  bindDateChange2: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  radiogroup: function (e) {
    this.setData({
      sign: e.detail.value
    })
  },
  radio: function (e) {
    this.setData({
      isSubmit: false
    })
  },
  getThings: function (e) {
    this.setData({
      things: e.detail.value
    })
  },
  compareDate: function (startDate, endDate) {
    var arrStart = startDate.split("-");
    var startTime = new Date(arrStart[0], arrStart[1], arrStart[2]);
    var startTimes = startTime.getTime();
    var arrEnd = endDate.split("-");
    var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2]);
    var endTimes = endTime.getTime();
    if (endTimes < startTimes) {
      return false;
    }
    return true;
  },
  isAddZero: function (arr) {
    if (arr < 10)
      arr = '0' + arr
    return arr
  },

  submitInfo: function(){
    var that =this
    var midInfo = []
    let startDate = new Date(this.data.startDate)
    let endDate = new Date(this.data.endDate)
    for(let i = startDate.getDate(); i <= endDate.getDate(); i++){
      midInfo.push({
        userid: this.data.userinfo[0]['id'],
        date: this.data.yearPri + "-" + this.isAddZero(this.data.monthPri) + "-" + this.isAddZero(i),
        sign: this.data.sign,
        things: this.data.things
      })
    }
    wx.request({
      url: 'https://jinn520.club/stopmeal/addStopMeal',
      data: midInfo,
      method: 'POST',
      success: function (e) {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        that.setData({
          startDate: that.data.startDatePri,
          endDate: that.data.startDatePri,
          sign: 0,
          checked: true,
          things: '',
          isSubmit: true
        })
        console.log(that.data)
      }
    })
  }
})