// pages/sub/sub.js
var db = wx.cloud.database;
var that = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    subImg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },
  text(e){
    that.setData({
      text:e.detail.value
    })
  },
  //拍照/相册获取图片
  photo(){
    wx.chooseMessageFile({
      count: 9,
      sourceType:['album','camera'],
      success(res1){
        var len = res1.tempFiles.length - 1
        console.log(res1.tempFiles.length);
        for(let i = 0; i < res1.tempFiles.length; i++){
          wx.cloud.uploadFile({       // 上传到云开发的存储中
           // 自定义随机命名图片 三元运算判断类型决定后缀
            cloudPath:res1.tempFiles[i].type=='file'?new Date().getTime()+'.doc':res1.tempFiles[i].type=='video'
            ?new Date().getTime()+'.mp4': new Date().getTime()+'.png', 
            filePath:res1.tempFiles[i].path             // 相当于云存储中生成的云端数据
          }).then(res2 =>{
           
            // console.log(res2.fileID);
            // arr = [...arr,res2.fileID]
            var arr = [...that.data.subImg,res2.fileID]
             if(i == 2){ 
              // console.log(arr); 
              console.log(arr);
            }
           
          })
        } 
        that.setData({
              subImg:that.data.subImg
          })
        console.log(that.data.subImg);
      },
    })
  },
  // 发布保存到sub数据库
  sub(){
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