// components/good/good.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    state1:true,
    state2:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap1(){
      this.setData({
        state1: false,
        state2:true
      })
    },
    tap1(){
      this.setData({
        state1: true,
        state2:false
      })
    }
    
  }
})
