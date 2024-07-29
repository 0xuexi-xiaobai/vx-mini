import { system } from "./getSystemInfo"

// components/custom-navigation-bar/custom-navigation-bar.js
Component({
  properties: {
    backgroundColor: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    barStyle: {
      type: String,
      value: '1'
    },
    showBackButton: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: ''
    }
  },

  data: {
    system: {},
  },

  lifetimes: {
    attached() {
      this.setData({
        system
      });
      // console.log(this.data.system);

      // Use properties
      this.applyStyles();
    }
  },

  methods: {
    back() {
      wx.navigateBack();
    },

    applyStyles() {
      const { backgroundColor, background, barStyle, showBackButton, color } = this.properties;

      // Apply styles and logic based on properties
      let styles = {
        backgroundColor: background || backgroundColor,
        color: color
      };

      if (barStyle === '1') {
        // Apply specific styles for barStyle 1
      } else if (barStyle === '2') {
        // Apply specific styles for barStyle 2
      } else if (barStyle === '3') {
        // Apply specific styles for barStyle 3
      }

      // Apply the styles to your component (you need to define your own logic here)
      // console.log('Applied styles:', styles);
    }
  }
});

/**
 * 比对当前用户基础库和指定的基础库版本
 * @param {*} v1 
 * @param {*} v2 
 */
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
