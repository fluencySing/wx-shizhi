// pages/know/know.js
const db = wx.cloud.database();
let app = getApp();
let that = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    imgB64:'',
    content:[],
    show:false,
    cloudImg:'',
    load:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },
  // 拍照获得图片
  take(){
    wx.chooseImage({
      count: 1,
      sizeType:['original', 'compressed'],
      sourceType: ['camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.getB64ByUrl(tempFilePaths[0]);
        that.setData({
          img:tempFilePaths[0],
          show:true
        })
        that.uploadImg()
      }
    })
  },
  // 从相册获得图片
  photo(){
    wx.chooseImage({
      count: 1,
      sizeType:['original', 'compressed'],
      sourceType: ['album'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.getB64ByUrl(tempFilePaths[0]);
        that.setData({
          img:tempFilePaths[0],
          show:true
        })
        that.uploadImg()
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  getB64ByUrl: function (url) {
    const FileSystemManager = wx.getFileSystemManager();
    FileSystemManager.readFile({
      filePath: url,
      encoding: 'base64',
      success(res) {
        that.setData({
          imgB64: res.data,
        });
      },
      fail(err){
        console.log(err);
      }
    })
  },
  // 获得结果
  result(){
    wx.setStorage({
      data: that.data.cloudImg,
      key: 'cloudImg',
    })
    that.setData({
      load:true
    })
    that.getToken(function(token) {
      that.getResult(token);
    });
  },
  // 将图片上传到云端
  uploadImg(){
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'.png',
      filePath:that.data.img
    }).then(res=>{
      that.setData({
        cloudImg:res.fileID
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  // 识别植物获得token
  getToken: function(callback) {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=BcfPOq5GTc1lmGC9swGYQVHA&client_secret=398924bxbm8U8DcYgGdEj4mxOjBpKGGs',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        var token = res.data.access_token;
        return callback(token);
      }
    });
  },
  // 识别植物结果
  getResult: function(token) {
    wx.request({
      url:'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + token, 
      method: "post",
      data: {
        image: that.data.imgB64,
        baike_num:3
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        that.setData({
          content: res.data.result
        }); 
          db.collection('main').add({
            data:{
              imgPath:that.data.cloudImg,
              content: res.data.result,
              type:'plantImg'
            }
          }).then(suc=>{
            db.collection('main').where({
              imgPath:that.data.cloudImg
            }).get().then(suc2=> {
              that.setData({
                load:false
              })
              wx.navigateTo({
                url: '../info/info?id='+suc2.data[0]._id,
              })
            })
          })
      },
      fail(err){
        console.log(err);
      }
    });
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