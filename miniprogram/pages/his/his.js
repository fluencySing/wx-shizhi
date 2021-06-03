// pages/his/his.js
let db = wx.cloud.database()
let that = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[
      {
        name:'植物',
        type:'plantImg'
      },
      {
        name:'菜品',
        type:'foodImg',
      },
      {
        name:'动物',
        type:'animalImg'
      }
    ],
    num:0,
    type:'plantImg',
    contents:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      id:options.id
    })
    that.getData()
  },
  getNum(e){
    that.setData({
      num : e.currentTarget.dataset.num,
      type: e.currentTarget.dataset.type
    })
    that.getData()
  },
  getData(){
    db.collection('main').where({
        type:that.data.type
    }).get().then(res => {
      that.setData({
        contents:res.data
      })
    })
  },
  jump(e){
    wx.navigateTo({
      url: '../info/info?id='+e.currentTarget.dataset.id,
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