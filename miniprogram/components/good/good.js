// components/good/good.js
var db = wx.cloud.database()
var that = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    state:true,
    num:0
  },
  /**
   * 组件的方法列表
   */
  lifetimes:{
     attached(){
       that = this
      this.setData({
        num:this.data.item.good,
        state:this.data.item.state
      })
    },
  },
  methods: {
    tap1(){
      this.setData({
        state: false,
        num: Number(this.data.num) + 1
      })
      db.collection('sub').where({
        _id:this.data.item._id
      }).update({
        data:{
          good: this.data.num,
          state:false
        }
      }).then(res=> {
      })
    },
    tap2(){
      this.setData({
        state: true,
        num: Number(this.data.num) - 1
      })
      db.collection('sub').where({
        _id:this.data.item._id
      }).update({
        data:{
          good: this.data.num,
          state:true
        }
      }).then(res=> {
      })
    }
  }
})
