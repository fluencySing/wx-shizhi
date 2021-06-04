// pages/im/im.js
var db = wx.cloud.database();
var that='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    lists:[],
    state:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    this.getList();
    wx.getStorage({
      key: 'openid',
    }).then(res =>{
      that.setData({
        openid:res.data
      })
    })
    
  },
  jumpSub(){
    wx.navigateTo({
      url: '../sub/sub?id='+that.data.openid,
    })
  },
  jumpDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '../detail/detail?detailid='+e.currentTarget.dataset.detailid,
    })
  },
  getList(){
    db.collection('sub').get().then(res => {
      that.setData({
        lists:res.data
      })
      console.log(res.data);
    }).catch(err => {
      console.log(err);
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
    that.onLoad()
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