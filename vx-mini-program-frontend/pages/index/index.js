//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    productList: [],
    coverList: []
  },
  onLoad: function () {
    this.loadData();
  },
  toggleShowAll: function (e) {
    const index = e.currentTarget.dataset.index;
    const productList = this.data.productList;
    productList[index].showAll = !productList[index].showAll;
    this.updateDisplayCells();
  },
  updateDisplayCells: function() {
    let productList = this.data.productList.map(item => {
      console.log('index.js item',item);
      item.displayCells = item.showAll ? item.productList : item.productList.slice(0, 3);
      return item;
    });
    this.setData({ productList });
  },
  handleSwiperChange(e) {
    this.setData({
      centerItem: e.detail.current,
    });
  },
  bindItemTap: function (e) {
    console.log('Item Tapped');
    const item = e.currentTarget.dataset.item;
    console.log('item:',item);
    wx.navigateTo({
      // url: '../product/product',
      url: '../product/product?data=' + encodeURIComponent(JSON.stringify({...item}))
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
  loadData: function () {
    console.log('index.js loadData');
    const data = { page: 1, pageSize: 100 };
    util.getData("/category/getCategoryList", data)
      .then(function (res) {
        const processedData = res.data.map(item => {
          return {
            ...item,
            showAll: false,
            displayCells: item.productList.slice(0, 3) || []
          };
        });
        this.setData({
          productList: processedData
        });
      }.bind(this))
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });

    util.getData("/product/getRecommendedProductList")
      .then(function (res) {
        console.log('/product/getRecommendedProductList:',res);
        this.setData({
          coverList: res.data
        });
      }.bind(this))
      .catch(function (error) {
        console.error('Error fetching data:', error);
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

