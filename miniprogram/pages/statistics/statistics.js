//index.js
//获取应用实例
Page({
  data: {
    dayStylePri: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
    ],
    dayStyle: [
      
    ],
    userinfo: [],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    day: new Date().getDate(),
    monthpri: new Date().getMonth() + 1,
    yearpri: new Date().getFullYear(),
    daypri: new Date().getDate(),
    clock: new Date().getHours()
  },
  onLoad() {

  },
  dayClick: function (event) {
    // let clickDay = event.detail.day;
    // let changeDay = `dayStyle[1].day`;
    // let changeBg = `dayStyle[1].background`;
    // this.setData({
    //   [changeDay]: clickDay,
    //   [changeBg]: "#FF0000"
    // })
    let allDay = this.data.dayStyle
    allDay.push({ month: 'current', day: 26, color: 'white', background: '#00CED1' })
    this.setData({
      dayStyle: allDay
    })
    console.log(this.data)
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
      allDay.push({ month: 'current', day: day, color: 'white', background: '#32CD32' })
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
      this.updateDate()
    }
  },

  dateChange: function(e){
    console.log(e.detail)
    this.setData({
      year: e.detail.currentYear,
      month: e.detail.currentMonth,
      dayStyle: []
    })
    if (this.data.month == this.data.monthpri && this.data.year == this.data.yearpri) {
      this.updateDate()
    }
  }
})
