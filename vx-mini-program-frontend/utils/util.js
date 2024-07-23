// request.js
const config = require('./config.js');
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
};

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var prompt_content = require('../data/data_prompt_content.js')



// function getData(url){
//   return new Promise(function(resolve, reject){
//     wx.request({
//       url: url,
//       data: {},
//       header: {
//         //'Content-Type': 'application/json'
//       },
//       success: function(res) {
//         console.log("success")
//         resolve(res)
//       },
//       fail: function (res) {
//         reject(res)
//         console.log("failed")
//       }
//     })
//   })
// }
function getData(url, data) {
  const fullUrl = `${config.BASE_URL}${url}`;
  return new Promise((resolve, reject) => {
    wx.request({
      url: fullUrl,
      method: 'GET',
      data :data,
      success: function(res) {
        resolve(res.data);
      },
      fail: function(res) {
        reject(res);
        console.log("failed");
      }
    });
  });
}
function getData2(){
  return index.index;
}

function getPromptData(){
  return prompt_content.prompt_content;
}
function getNext(){
  return index_next.next;
}






module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getPromptData = getPromptData;



