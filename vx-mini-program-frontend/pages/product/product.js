const QRCode = require('./weapp-qrcode-test.js');
import rpx2px from '../../utils/rpx2px.js';

let qrcode;

const qrcodeWidth = rpx2px(300);
const quality = 1;
const logoImagePath = '/images/bg.jpg';

var app = getApp();

Page({
  data: {
    isQrcodeShown: false, // 控制 canvas 是否显示
    text: 'http://www.baidu.com',
    qrcodeWidth: qrcodeWidth,
    image: '',
    userInfo: {},
    title: "title2",
    desc: "title2.aibox--微信小程序版...",
    img: [
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.FelwzQdlCWF4ptoWmTz7sQHaEK',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.PkKtfHdEp6YSv7qkgEBWEQHaEK',
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.98oA77-4jq0gjpscFzbXKwHaE8'
    ],
  },
  onLoad: function () {
    console.log('onLoad');
    this.initQrcode();
  },
  hideModal: function (e) {
    console.log('hideModal');
    this.setData({
      isQrcodeShown: false
    });

  },
  initQrcode: function () {
    const z = this;
    qrcode = new QRCode('canvas', {
      usingIn: this,
      backgroundImage: logoImagePath,
      logoImage: logoImagePath,
      width: qrcodeWidth,
      height: qrcodeWidth,
      size: qrcodeWidth,
      colorDark: "lightblue",
      colorLight: "#ffffff",
      tempCanvasId: 'canvas',
      margin: 10,
      quality,
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  toggleCanvas: function () {
    console.log('toggleCanvas.');
    this.setData({ isQrcodeShown: true });
  },
  renderCode: function () {
    const z = this;
    qrcode.makeCode(z.data.text, () => {
      qrcode.exportImage(function (path) {
        console.log('Image path:', path);
        z.setData({
          image: path
        });
      });
    });
  },
  onReady: function () {
    this.renderCode();
  },
  // 其他方法...
});