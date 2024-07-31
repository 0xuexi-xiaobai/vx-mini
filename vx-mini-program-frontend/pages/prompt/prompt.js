// pages/prompt/prompt.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt_content: "",
    coverList: [
      {
        id: 0,
        url: "../../images/landscape1.jpg",
        title:"title1",
        desc:"desc1"
      },
      {
        id: 1,
        url: "../../images/landscape2.jpg",
        title:"title2",
        desc:"desc2"
      },
      {
        id: 2,
        url:'../../images/portrait.jpg',
        title:"title3",
        desc:"desc3"
      }
    ],
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // let newArr = [5, 3, 4, 7, 8, 2, 1, 5, 7, 6]
    // this.setData({ arr: [...this.data.arr, ...newArr] })
    // this.setData({ arr: this.data.arr })
  },
  // 点击复制
  copywxtap: function (event) {
    // wx.showToast({
    //   title: '复制成功',
    // })

    wx.setClipboardData({
      data: this.data.prompt_content, //复制的数据
      // success: function (res) {
      //   wx.getClipboardData({    //这个api是把拿到的数据放到电脑系统中的
      //     success: function (res) {
      //       console.log(res.data) // data
      //     }
      //   })
      // }

    })
  },
  searchBtn: function (event) {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showTabBar();
    // console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // this.getData();
    const data = JSON.parse(decodeURIComponent(options.data));
    console.log('data:',data);
    this.setData({
      prompt_content:data.value,

    });
  },
  // //使用本地 fake 数据实现刷新效果
  // getData: function () {
  //   var feed = util.getData2();
  //   var prompt_content0 = util.getPromptData();
  //   this.setData({
  //     prompt_content: prompt_content0.content,
  //     coverList: feed.coverList,
  //   });
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})