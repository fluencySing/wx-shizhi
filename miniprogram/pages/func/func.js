// pages/func/func.js
let db = wx.cloud.database();
let that = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
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
    that.getLogin()
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
               openid:res.data.openid
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
        wx.setStorage({
          data: that.data.openid,
          key: 'openid',
        })
        db.collection('userInfo').get().then(res2 => {
          if(res2.data.length>0){
              for(var i=0; i<res2.data.length;i++){
              if(res2.data[i]._openid != that.data.openid){
                  db.collection('userInfo').add({ 
                    data:{
                      userInfo:res1.userInfo,
                    }
                  }).then(res2 => {
                    console.log(res2);
                  })
              }
            }
          }else{
            db.collection('userInfo').add({ 
              data:{
                userInfo:res1.userInfo,
              }
            }).then(res2 => {
              console.log(res2);
            })
          }
        
        }).catch(err => {
          console.log(err);
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