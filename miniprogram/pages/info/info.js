// pages/info/info.js
let db = wx.cloud.database()
let that = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cloudImg:'',
    datail:[],
    id:''
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
  getData(){
    db.collection('main').where({
      _id:that.data.id,
    }).get().then(res=>{
      that.setData({
        cloudImg:res.data[0].imgPath
      })
      let arr = res.data[0].content;
      if(res.data[0].type == 'foodImg'){
        for(let i=0; i<arr.length; i++){
          arr[i].num=(arr[i].probability*100).toFixed(2)
          if(JSON.stringify(arr[i].baike_info)=='{}'){
           arr[i].desc='暂无资料'
          }else{
            arr[i].desc = arr[i].baike_info.description
          }
         for(let j=i+1; j<arr.length; j++){
           if(Number(arr[i].score) < Number(arr[j].score)){
             let t = arr[i]
             arr[i] = arr[j]
             arr[j] = t
           }
         }
        }
      }else{
        for(let i=0; i<arr.length; i++){
          arr[i].num=(arr[i].score*100).toFixed(2)
          if(JSON.stringify(arr[i].baike_info)=='{}'){
           arr[i].desc='暂无资料'
          }else{
            arr[i].desc = arr[i].baike_info.description
          }
         for(let j=i+1; j<arr.length; j++){
           if(Number(arr[i].score) < Number(arr[j].score)){
             let t = arr[i]
             arr[i] = arr[j]
             arr[j] = t
           }
         }
        }
      }
      that.setData({
        detail:arr
      })
    }).catch(err=>{
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