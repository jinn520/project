// pages/admin/admin.js
Page({

  data: {
    userinfo:[],
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    second: '',
    date: '',//第一个picker用户选择的日期
    dateend: '',//第二个picker用户选择的日期
    startDate:'',//日期选择范围的开始时间
    endDate:'',//日期选择范围的最后时间
    checked: true, //操作标识
    isSubmit: true,//按键屏蔽
    stopmealsign: 0,//停餐标识，0为停餐，1为加餐
    things: ''//备注信息，可为空
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.getStorage({
      key: 'userinfo',
      success(res){
        console.log("[自定义函数][admin] 获取storage信息成功！ ")
        that.setData({
          userinfo: res.data
        })
      }
    })
    var myDate = new Date()
    this.setData({
      year: myDate.getFullYear(),
      month: myDate.getMonth()+1,
      day: myDate.getDate(),
      hour: myDate.getHours(),
      minute: myDate.getMinutes(),
      second: myDate.getSeconds(),
    })
    var endYear = myDate.getFullYear()
    var endMonth = myDate.getMonth()+7
    if(endMonth > 12){
      endYear = endYear + 1
      endMonth = endMonth - 12
    }
    var endDaypri = myDate.getDate()
    var endDay = new Date(endYear, endMonth, 0).getDate()
    if(endDaypri > endDay){
      endDaypri = endDay
    }
    console.log("[自定义函数][admin]" + endMonth + "月有" + endDay + "天")
    this.setData({
      date: this.data.year + "-" + this.data.month + "-" + this.data.day,
      dateend: this.data.year + "-" + this.data.month + "-" + this.data.day,
      startDate: this.data.year + "-" + this.data.month + "-" + this.data.day,
      endDate: endYear + "-" + endMonth + "-" + endDaypri
    })
    console.log(this.data);
  },

  bindDateChange: function(e){
    if (this.data.date != e.detail.value){
      var compareDate = this.compareDate(e.detail.value,this.data.dateend)
      console.log(compareDate)
      if(!compareDate){
        this.setData({
          date: e.detail.value,
          dateend: e.detail.value
        })
      }
      else {
        this.setData({
          date: e.detail.value,
        })
      }
    }
  },
  bindDateChange2: function(e){
    console.log(e.detail)
    this.setData({
      dateend: e.detail.value
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

  radiogroup: function (e) {
    this.setData({
      stopmealsign: e.detail.value
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
  submitInfo: function(e){
    var stopmealinfo={
      'userid': this.data.userinfo[0]['id'],
      'begin': this.chaifen(this.data.date) + "T" +this.isAddZero(this.data.hour) + ":" + this.isAddZero(this.data.minute) + ":" + this.isAddZero(this.data.second),
      'end': this.chaifen(this.data.dateend) + "T" + this.isAddZero(this.data.hour) + ":" + this.isAddZero(this.data.minute) + ":" + this.isAddZero(this.data.second),
      'sign': this.data.stopmealsign,
      'things': this.data.things
    }
    console.log(stopmealinfo);
    wx.request({
      url: 'https://jinn520.club/stopmeal',
      method: 'POST',
      data: stopmealinfo,
      success(suc){
        console.log(suc)
      }
    })
  },

  isAddZero: function(arr){
    if(arr < 10)
      arr = '0' + arr
    return arr
  },
  chaifen: function (e) {
    var b = e.split('-')
    if(b[1] < 10){
      b[1] = '0' + b[1]
    }
    if(b[2] < 10){
      b[2] = '0' + b[2]
    }
    var c = b[0] + '-' + b[1] + '-' + b[2]
    return c
  },
})