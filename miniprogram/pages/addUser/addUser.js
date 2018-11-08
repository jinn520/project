// pages/addUser/addUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    permissions: false,
    departmentName:[],
    id:1,
    name:'',
    checked: false
  },

  onLoad: function(){
    const app = getApp()
    if (app.globalData[0]['rolesid'] == 2){
      this.setData({
        permissions: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    if(this.data.permissions == true){
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
    }
  },
  bindChange: function (e) {
    this.setData({
      id:this.data.departmentName[e.detail.value]["id"]
    })
  },
  getName: function(e){
    this.setData({
      name: e.detail["value"]
    })
    // console.log(this.data.name);
  },
  adduserinfo: function(){
    var that=this
    if(this.data.name!= ''){
      var userinfo = {
        rolesid: 1,
        name: this.data.name,
        departmentid: this.data.id
      }
      wx.request({
        url: 'https://jinn520.club/user',
        method: "POST",
        data: userinfo,
        success(res){
          wx.showToast({
            title: '添加成功',
          })
          that.setData({
            name:'',
            checked: false
          })
        } 
      })
    }
    else console.log("用户名不能为空！")
  },

  radio: function(e){
    this.setData({
      checked: true
    })
  }
})