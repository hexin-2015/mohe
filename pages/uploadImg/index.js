import { uploadBeautyData2Rank, uploadImg } from "../../utils/service";
const app = getApp();

Page({
  data: {
    hasSelected: false,
    showError: false,
    imgInfo: "null",
    img:"",
    imgType:"",
    progressNum:0,
    userInfo: {},
    kindId: "",
    kindInfo:{},
    imageUrls: [],
    isHiddenBtn: true,
    haveIntroduction:false,
  },
  
  onLoad: function (options) {
    this.setData({ 
      imgType: options.id,
      img: options.imgUrl,
      userInfo: app.globalData.userInfo,
      
      })
    wx.setNavigationBarTitle({ title: options.title})
    var that = this;
    uploadImg(options.imgUrl, this.data.imgType).then(data => {
      var resInfo = parseSuccessRes(that, data);
      that.setData({ imgInfo: resInfo })
    });
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

  /**
   * 修改简介
   */
  onModifyIntroduction: function (e) {
    modifyIntroduction(this.data.imgType, this.data.kindId)
  },

  /**
   * 添加简介
   */
  onAddIntroduction: function (e) {
    addIntroduction(this.data.imgType, this.data.kindId)

  },

  /**
   * 点赞
   */
  onLike: function (e) {
    like()
  },

  /**
   * 评论
   */
  onComment: function (e) {
    comment()

  },
})


/**
 * 解析 返回值 "plant", "animal", "car", "dish"
 */
function parseSuccessRes(thisPage,resultData){ 
  var json = JSON.parse(resultData.data)
  var imgInfo = {};
  if (json.code != 200) {
    imgInfo.isOK = false
    imgInfo.msg = "哇喔，识别失败..."
    return imgInfo;
  }
  imgInfo.isOK = true
  imgInfo.msg = "恭喜您，识别成功！"
  var name = json.data.detectLog.name != undefined ? json.data.detectLog.name : "错误"
  var score = json.data.detectLog.score != undefined ? json.data.detectLog.score : undefined
  score = Math.floor(score * 10000) / 100 + " %"
  imgInfo.score = score
  imgInfo.name = name
  // imgInfo.push({ showTitle: "名称", showValue: name });
  // imgInfo.push({ showTitle: "可信度", showValue: score });
  
  thisPage.setData({ kindId: json.data.kind_id })

  if (json.data.kindInfo != undefined) {
    thisPage.setData({ kindInfo: json.data.kindInfo })
    thisPage.setData({ haveIntroduction:true})
  }

  var images = json.data.images;
  if (images != undefined) {
    console.log("====================" + thisPage.data.img)
    images.unshift(thisPage.data.img)
    thisPage.setData({ 
      imageUrls: images, 
      imageTemp: thisPage.data.img,
      isHiddenBtn: false
      })
  }
  

  return imgInfo
}

function modifyIntroduction(imgType, kindId) {
  console.log("-------------modifyIntroduction-------------------")
  var tempImgUrl = '../introduce/introduce?imgType=' + imgType + "&kindId=" + kindId
  wx.navigateTo({
    url: tempImgUrl
  })
  return false
}

function addIntroduction(imgType, kindId) {
  console.log("-------------addIntroduction-------------------")

  var tempImgUrl = '../introduce/introduce?imgType=' + imgType + "&kindId=" + kindId
  wx.navigateTo({
    url: tempImgUrl
  })

  return false
}

function like() {
  console.log("-------------like-------------------")
  return false
}

function comment() {
  console.log("-------------comment-------------------")

  return false
}


