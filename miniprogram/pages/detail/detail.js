// pages/detail/detail.js
var db = wx.cloud.database();
var that = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{},
    len:0,
    show: false,
    state:true,
    num:0,
    openid:'',
    userInfo:{},
    val:'',
    comment:[],
    commentItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.getStorage({
      key: 'openid',
    }).then(res => {
      that.setData({
        openid:res.data
      })
    })
    that.getDetail(options.detailid)
    that.getUser()
  },
  getDetail(id){
    db.collection('sub').where({
      _id:id
    }).get().then(res => {
      that.setData({
        content:res.data[0],
        len:res.data[0].img.length,
        num:res.data[0].good,
        state:res.data[0].state
      })
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tap1(){
    if(that.data.state){
      this.setData({
        state: false,
        num: Number(this.data.num) + 1
      })
      db.collection('sub').where({
        _id:that.data.content._id
      }).update({
        data:{
          good: that.data.num,
          state:false
        }
      }).then(res=> {
      })
    }
  },
  tap2(){
    if(that.data.state == false){
       this.setData({
        state: true,
        num: Number(this.data.num) - 1
      })
      db.collection('sub').where({
        _id:that.data.content._id
      }).update({
        data:{
          good: that.data.num,
          state:true
        }
      }).then(res=> {
      })
    }
  },
  getUser(){
    db.collection('userInfo').where({
      _openid:that.data.openid
    }).get().then(res=>{
      console.log(res.data[0]);
      that.setData({
        userInfo:res.data[0]
      })
    })
  },
  getVal(e){
    that.setData({
      val:e.detail.value
    })
  },
  // 发送评论
  send(){
    that.data.commentItem.user = that.data.userInfo
    that.data.commentItem.val = that.data.val
    that.setData({
      commentItem:that.data.commentItem
    })
    that.data.comment = [...that.data.comment,that.data.commentItem]
    that.setData({
      comment:that.data.comment
    })
    console.log(that.data.comment);
    // db.collection('sub').where({
    //   _id:that.data.detailid
    // }).update({
    //   data:{
    //     comment:
    //   }
    // })
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