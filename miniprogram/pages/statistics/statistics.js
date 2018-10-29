//index.js
//获取应用实例
Page({
  data: {
    dayStyle: [
      
    ],
    isAddDayStyleLength: true,
    userinfo: [],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    day: new Date().getDate(),
    monthpri: new Date().getMonth() + 1,
    yearpri: new Date().getFullYear(),
    daypri: new Date().getDate(),
    clock: new Date().getHours(),
    dateclick: '',
    sign: '',
    things: '',
    disabledClick: true
  },
  onLoad() {

  },
  dayClick: function (event) {
    if(this.data.isAddDayStyleLength == true){
      var midDayStyle = this.data.dayStyle
      midDayStyle.push({ month: 'current', day: '', color: 'white', background: '#FF4040' })
      this.setData({
        dayStyle: midDayStyle,
        isAddDayStyleLength: false
      })
    }
    let clickDay = event.detail.day
    let dayStyleLength = this.data.dayStyle.length - 1
    if(dayStyleLength >= 0){
      let changeDay = 'dayStyle[' + dayStyleLength + '].day'
      this.setData({
        [changeDay]: clickDay,
      })
    }
    var that = this
    if(event.detail.year == this.data.yearpri && event.detail.month == this.data.monthpri){
      let wholeDate
      if(event.detail.day >= 10){
        wholeDate = event.detail.year + "" + event.detail.month + "" + event.detail.day
      }else {
        wholeDate = event.detail.year + "" + event.detail.month + "0" + event.detail.day
      }
      wx.request({
        url: 'https://jinn520.club/stopmeal/'+wholeDate,
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          if(res.data == 0){
            let time = new Date().getHours()
            let dayclick = event.detail.year + '-' + that.isAddZero(event.detail.month) + '-' + that.isAddZero(event.detail.day)
            if(time < 9){
              if(event.detail.day >= that.data.daypri)
              {
                that.updateStatus(dayclick, 1)
              }else {
                that.updateStatus(dayclick, 0)
              }
            }else {
              if (event.detail.day > that.data.daypri) {
                let dayclick = event.detail.year + '-' + that.isAddZero(event.detail.month) + '-' + that.isAddZero(event.detail.day)
                that.updateStatus(dayclick, 1)
              } else {
                that.updateStatus(dayclick, 0)
              }
            }
          }else {
            that.setData({
              dateclick: event.detail.year + '-' + that.isAddZero(event.detail.month) + '-' + that.isAddZero(event.detail.day),
              sign: '您所点击的日期不是工作日',
              things: "",
              disabledClick: true
            })
          }
        },
      })
    }
  },
  isAddZero: function (arr) {
    if (arr < 10)
      arr = '0' + arr
    return arr
  },
  onReady: function(){
    var that = this
    wx.getStorage({
      key: 'userinfo',
      success(res) {
        console.log("[自定义函数][statistics] 获取storage信息成功！ ")
        that.setData({
          userinfo: res.data
        })
        that.updateDate()
      }
    })
  },

  updateDate: function(){
    let that = this
    let mealInfo = {
      userid: this.data.userinfo[0]["id"],
      year: this.data.year,
      month: this.data.month
    }
    this.setData({ dayStyle: [] })
    wx.request({
      url: 'https://jinn520.club/stopmeal/getstopmeal',
      data: mealInfo,
      method: 'POST',
      success: function (res) {
        for(let i = 0; i < res.data.length; i++){
          let dayOfMonth = res.data[i]['date']
          let sign = res.data[i]['sign']
          that.addColor(dayOfMonth,sign)
        }
      } 
    })
  },

  addColor: function (dayOfMonth, sign){
    let allDay = this.data.dayStyle
    let middle = dayOfMonth.split("-")
    let day = middle[2]
    if (day < this.data.day){
      if(sign == 0){
        allDay.push({ month: 'current', day: day, color: 'white', background: '#90EE90' })
      }
    } else if (day > this.data.day){
      if(sign == 0){
        allDay.push({ month: 'current', day: day, color: 'white', background: '#32CD32' })
      }
    }else {
      if(this.data.clock >= 9){
        allDay.push({ month: 'current', day: day, color: 'white', background: '#90EE90' })
      }else {
        allDay.push({ month: 'current', day: day, color: 'white', background: '#32CD32' })
      }
    }
    this.setData({
      dayStyle: allDay
    })
  },

  next: function(e){
    let monthmiddle = this.data.month + 1
    if(monthmiddle > 12){
      this.setData({
        year: this.data.year + 1,
        month: 1,
        dayStyle: []
      })
    }else {
      this.setData({
        month: this.data.month + 1,
        dayStyle: []
      })
    }
    if(this.data.month == this.data.monthpri && this.data.year == this.data.yearpri){
      this.setData({
        isAddDayStyleLength: true
      })
      this.updateDate()
    }
  },

  prev: function(e){
    let monthmiddle = this.data.month - 1
    if (monthmiddle < 1) {
      this.setData({
        year: this.data.year - 1,
        month: 12,
        dayStyle: []
      })
    } else {
      this.setData({
        month: this.data.month - 1,
        dayStyle: []
      })
    }
    if (this.data.month == this.data.monthpri && this.data.year == this.data.yearpri) {
      this.setData({
        isAddDayStyleLength: true
      })
      this.updateDate()
    }
  },

  dateChange: function(e){
    // console.log(e.detail)
    this.setData({
      year: e.detail.currentYear,
      month: e.detail.currentMonth,
      dayStyle: []
    })
    if (this.data.month == this.data.monthpri && this.data.year == this.data.yearpri) {
      this.setData({
        isAddDayStyleLength: true
      })
      this.updateDate()
    }
  },

  updateStatus: function(clickDate, canUpdate){
    var that = this
    let midDate = {
      userid: this.data.userinfo[0]["id"],
      date: clickDate
    }
    wx.request({
      url: 'https://jinn520.club/stopmeal/getOneStopmeal',
      data: midDate,
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res.data)
        if(canUpdate == 0){
          if (res.data.sign == 0) {
            that.setData({
              dateclick: clickDate,
              sign: '已用餐',
              things: res.data.things,
              disabledClick: true
            })
          } else {
            that.setData({
              dateclick: clickDate,
              sign: '未用餐',
              things: res.data.things,
              disabledClick: true
            })
          }
        }else {
          if (res.data.sign == 0) {
            that.setData({
              dateclick: clickDate,
              sign: '需要用餐',
              things: res.data.things,
              disabledClick: false
            })
          } else {
            that.setData({
              dateclick: clickDate,
              sign: '停餐',
              things: res.data.things,
              disabledClick: false
            })
          }
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  clickupdate: function(e){
    var that = this
    let midDate = {
      userid: this.data.userinfo[0]["id"],
      date: this.data.dateclick
    }
    wx.showModal({
      title: '提示',
      content: '是否修改所选日期的状态？',
      success: function(e){
        if(e.confirm){
          wx.request({
            url: 'https://jinn520.club/stopmeal',
            method: 'POST',
            data: midDate,
            success: function(suc){
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000,
                mask: true
              })
              that.setData({
                isAddDayStyleLength: true,
                dateclick: '',
                sign: '',
                things: '',
                disabledClick: false
              })
              that.updateDate()
            },
            fail: function(err){
              wx.showToast({
                title: '修改失败',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          })
        }
      }
    })
  }
})
