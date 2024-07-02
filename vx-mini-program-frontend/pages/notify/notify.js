//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["活动通知", "活动", "关注活动"],
    currentNavtab: "0"
  },
  onLoad: function () {

  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})
