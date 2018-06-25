// pages/recognition/recognition.js
var host = "https://mohe.ipnewgame.com";
var request = require('../common/js/request.js');
var imgType = "face";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    imgInfo: "null",
    faceLogId: "",
    imgType: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgType: options.id,
      img: options.imgUrl
    })

    uploadImg(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  uploadRank: function (e) {
    var that = this;
    var sessionid = wx.getStorageSync("sessionid");
    wx.request({
      url: host + '/upload/doRankBeauty',
      data: {
        "sessionID": sessionid,
        "faceLogId": that.data.faceLogId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})



function uploadImg(thisPage) {
  var _this = thisPage;
  var imgPath = thisPage.data.img;
  var url = host + '/upload/weixinsave';
  var sessionID = request.getSessionid();
  console.log(">>>>>>>>>>>>>>>>>>>>>>>" + imgPath);
  var loadTask = wx.uploadFile({
    url: url,
    filePath: imgPath,
    name: 'xx',
    formData: {
      "sessionid": sessionID,
      "imgType": imgType
    },
    success: function (res) {
      console.log("-------------us-------------------")
      console.log(res)
      var resInfo = parseSuccessRes(_this, res);
      _this.setData({ imgInfo: resInfo })

    },
    fail: function (res) {
      console.log("fail" + res);
    },
    complete: function () {
      wx.hideLoading();
    }

  })
  //loading
  wx.showLoading({
    title: '玩命识别中',
    mask: true
  })
}



function parseSuccessRes(thisPage, resultData) {
  return parse1(thisPage, resultData);
}

/**
 * 解析 返回值 "plant", "animal", "car", "dish"
 */
function parse1(resultData) {
  var json = JSON.parse(resultData.data);
  var imgInfo = new Array();
  var name = json.data.name != undefined ? json.data.name : "错误";
  var score = json.data.score != undefined ? json.data.score : undefined;
  score = Math.floor(score * 10000) / 100 + " %";
  imgInfo.push({ showTitle: "名称", showValue: name });
  imgInfo.push({ showTitle: "可信度", showValue: score });
  return imgInfo;
}