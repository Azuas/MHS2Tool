//index.js
const app = getApp()
const db = wx.cloud.database()
const arrayData = []
var monsterData = require("../../data/monsterData.js")

Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })

    //导入数据
    // arrayData.forEach(element => {
    //   db.collection('monster').add({
    //     data: element,
    //     success: function(res) {
    //       console.log(res)
    //     }
    //   })
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //  页面初次渲染完成后，使用选择器选择组件实例节点，返回匹配到组件实例对象  
    let mysearchbar = this.selectComponent('#mysearchbar')
    mysearchbar.inputChange({
      detail: {}
    })
  },
  search: function (value) {
    value = value.toLowerCase()
    return new Promise((resolve, reject) => {
      let list = [];
      if (value && value != '') {
        list = monsterData.list.filter((item) => {
          return (item.keyword_str.indexOf(value) >= 0) || (item.name.indexOf(value) >= 0)
        })
      }else {
        list = monsterData.list
      }
      resolve(list);
      // wx.cloud.callFunction({
      //     name: 'quickstartFunctions',
      //     data: {
      //       type: 'getMonsterData',
      //       keyword: value
      //     }
      //   })
      //   .then(res => {
      //     resolve(res.result.data);
      //     wx.hideLoading()
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //     resolve(e);
      //     wx.hideLoading()
      //   })
    })
  },
  clear: function (e) {
    let mysearchbar = this.selectComponent('#mysearchbar')
    mysearchbar.inputChange({
      detail: {}
    })
  },
  selectResult: function (e) {
    let mysearchbar = this.selectComponent('#mysearchbar')
    mysearchbar.cancleInput()
    console.log('select result', e.detail)
  },
})
