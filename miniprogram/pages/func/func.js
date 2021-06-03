// pages/func/func.js
let db = wx.cloud.database();
let that = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    userName:'',
    avatarUrl:'',
    state:false,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
      wx.getStorage({
        key: 'userName',
      }).then( res => {
        that.setData({
          userName:res.data
        })
      })
      wx.getStorage({
        key: 'avatarUrl',
      }).then( res => {
        that.setData({
          avatarUrl:res.data
        })
      })
  },
  his(){
    if(that.data.userName){
      wx.navigateTo({
       url: '../his/his?id='+that.data.id,
     })
   }else{
     that.getUserProfile()
   }
  },
  im(){
    if(that.data.userName){
       wx.navigateTo({
        url: '../im/im?id='+that.data.id,
      })
    }else{
      that.getUserProfile()
    }
  },
  getLogin(){
    wx.login({
     success(res){
       if(res.code){
         wx.request({
           url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxebb92b7d22557339&secret=d14cb53cfba1a75555bebe40a14873a8&js_code='+ res.code+'&grant_type=authorization_code',
           success:function(res){
             that.setData({
               id:res.data.openid
             })
           },
           fail:function(err){
             console.log(err);
           }
         })
       }
     }
    })
  },
  out(){
    wx.clearStorage({
      success: (res) => {
        that.setData({
          userName:'',
          avatarUrl:''
        })
      },
    })
  },
  getUserProfile(e){
    wx.getUserProfile({
      desc:'用户登录',
      success:function(res1){
        console.log(res1.userInfo);
        that.setData({
          userInfo:res1.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({
          data: res1.userInfo.nickName,
          key: 'userName',
        })
        wx.setStorage({
          data: res1.userInfo.avatarUrl,
          key: 'avatarUrl',
        })
        db.collection('userInfo').add({ 
          data:{
            userInfo:res1.userInfo,
          }
         }).then(res2 => {
           console.log(res2);
         })
         that.onLoad()
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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