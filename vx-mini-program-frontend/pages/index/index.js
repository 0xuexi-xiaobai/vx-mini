//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    banner: "banner",
    recommendation: "今日推荐",
    prompt: "prompt生成器",
    productList: [
      {
        id: 0,
        title: "AIGC热门推荐1",
        cells: [
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长0",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长0.1",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长0",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长0.1",
            productDesc: "说明文字"
          },
        ],
        desc: "desc1",
        showAll: false,
        displayCells: []
      },
      {
        id: 1,
        title: "AIGC热门推荐2",
        cells: [
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长1",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长1.1",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长1",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长1.1",
            productDesc: "说明文字"
          },
        ],
        desc: "desc1",
        showAll: false,
        displayCells: []
      },
      {
        id: 2,
        title: "AIGC热门推荐3",
        cells: [
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长2",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长2.2",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长2",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长2.2",
            productDesc: "说明文字"
          },
        ],
        desc: "desc1",
        showAll: false,
        displayCells: []
      },
      {
        id: 3,
        title: "AIGC热门推荐4",
        cells: [
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长4",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长4.2",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长4.2",
            productDesc: "说明文字"
          },
          {
            url: "../../images/24213.jpg",
            productTitle: "标题文字说明文字很长4.2",
            productDesc: "说明文字"
          },
        ],
        desc: "desc1",
        showAll: false,
        displayCells: []
      },
    ],
    showAll: false,
    feed: [],
    feed_length: 0,
    title: "",
    centerItem: 0,
    coverList: [],
    circular: true,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
  },
  onLoad: function () {
    var that = this;
    this.updateDisplayCells();
    this.getData();
  },
  updateDisplayCells: function() {
    let productList = this.data.productList.map(item => {
      item.displayCells = item.showAll ? item.cells : item.cells.slice(0, 3);
      return item;
    });
    this.setData({ productList });
  },
  toggleShowAll: function(e) {
    const index = e.currentTarget.dataset.index;
    const productList = this.data.productList;
    productList[index].showAll = !productList[index].showAll;
    this.updateDisplayCells();
  },
  handleSwiperChange(e) {
    this.setData({
      centerItem: e.detail.current,
    });
  },
  bindItemTap: function () {
    console.log('Item Tapped');
    wx.navigateTo({
      url: '../product/product'
    });
  },
  bindPromptTap: function () {
    console.log('tttt');
    wx.switchTab({
      url: '../promptList/promptList'
    });
  },
  upper: function () {
    wx.showNavigationBarLoading();
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower");
  },
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        console.log(data);
      });
  },
  getData: function () {
    var feed = util.getData2();
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length,
      coverList: feed.coverList,
      title: feed.title
    });
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length,
      coverList: feed.coverList
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      });
    }, 3000);
  },
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    });
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      });
    }, 3000);
  }
});

