// pages/addUser/addUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{id:1,name:"12"},{id:2,name:"qwe"}],
    departmentName:[],
    isclick:false,
    id:1,
    name:null
  },

cli: function () {
  this.setData({
    isclick: true
  })
  console.log(this.data.departmentName);
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
        for(var index in res.data){
          middata.push({id:res.data[index]["id"],name:res.data[index]["name"]})
        }
        that.setData({
          departmentName: middata
        })
      }
    })
  },
  bindChange: function (e) {
    this.setData({
      id:this.data.departmentName[e.detail.value]["id"]
    })
    // console.log(this.data.id)
  },
  getName: function(e){
    this.setData({
      name: e.detail["value"]
    })
    // console.log(this.data.name);
  },
  adduserinfo: function(){
    var that=this
    if(this.data.name!=null){
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
          console.log(res)
          that.setData({
            name:''
          })
        } 
      })
    }
    else console.log("用户名不能为空！")
  }
})