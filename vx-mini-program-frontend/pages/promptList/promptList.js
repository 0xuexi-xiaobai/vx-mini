// pages/prompt/prompt.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt_content: "请输入prompt。等待生成...",
    arr: []
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  // 点击复制
  copywxtap: function (event) {
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
  bindPromptTap: function (e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      // url: '../product/product',
      url: '../prompt/prompt?data=' + encodeURIComponent(JSON.stringify({ ...item }))
    });
  },
  searchBtn: function (e) {
    const item = e.detail.value;

    console.log(item);
    const prompt = {"prompt":item}
    util.postData("/user/callDashScope",prompt)
      .then(function (res) {
        console.log(res.prompt);
        this.setData({
          prompt_content:res.prompt
        })
      }
        .bind(this)
      )
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const data = { page: 1, pageSize: 100 };
    util.getData("/prompt/getPromptList",data)
      .then(function (res) {
        this.setData({
          arr: res.data
        });
      }
        .bind(this)
      )
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  },
  //使用本地 fake 数据实现刷新效果
  getData: function () {
    // var prompt_content0 = util.getPromptData();
    // this.setData({
    //   prompt_content: prompt_content0.content,
    // });
  },
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