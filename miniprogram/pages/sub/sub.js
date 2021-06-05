// pages/sub/sub.js
var db = wx.cloud.database();
var that = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    txt:'',
    subImg:[],
    len:0,
    userName:'',
    avatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    db.collection('userInfo').where({
      _openid:options.id
    }).get().then(res => {
      that.setData({
        userName:res.data[0].userInfo.nickName,
        avatarUrl:res.data[0].userInfo.avatarUrl
      })
    })
  },
  text(e){
    that.setData({
      txt:e.detail.value
    })
  },
  //拍照/相册获取图片
  photo(){
    var arr = []
    var newArr = that.data.subImg
    wx.chooseMessageFile({
      count: 9,
      sourceType:['album','camera'],
      success(res1){
        for(let i = 0; i < res1.tempFiles.length; i++){
          wx.cloud.uploadFile({       // 上传到云开发的存储中
            // 自定义随机命名图片 三元运算判断类型决定后缀
            cloudPath:res1.tempFiles[i].type=='file'?new Date().getTime()+'.doc':res1.tempFiles[i].type=='video'
            ?new Date().getTime()+'.mp4': new Date().getTime()+'.png', 
            filePath:res1.tempFiles[i].path             // 相当于云存储中生成的云端数据
          }).then(res2 =>{
            arr = [...arr,res2.fileID]
            that.setData({
              subImg:[...newArr,...arr]
            })
          })
        } 
      },
    })
  },
  // 发布保存到sub数据库
  sub(){
    if(that.data.subImg.length>0){
        db.collection('sub').add({ 
        data:{
          userName:that.data.userName,
          avatarUrl:that.data.avatarUrl,
          txt:that.data.txt,
          img:that.data.subImg,
          good:0,
          state:true,
          comment:[]
        }
      }).then(res => {
        wx.showToast({
          title: '发布成功',
        })
        wx.reLaunch({
          url: '../im/im',
        })
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '内容不能为空',
      })
    }
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