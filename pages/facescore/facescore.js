// pages/facescore/facescore.js
import { uploadBeautyData2Rank, uploadImg } from "../../utils/service";
var imgType = "face";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    imgInfo: "null",
    faceLogId:"",
    canUploadRank:false, 
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isUpload=="true"){
      this.setData({
        canUploadRank: true
      });
    }else{
      this.setData({
        canUploadRank: false
      });
    }
    
    this.setData({
      img: options.imgUrl,
      canUploadRank: options.isUpload
    });
    var that = this;
    uploadImg(options.imgUrl,imgType).then(data=>{
      console.log(data)
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
  uploadRank:function(e){
    var that =this;
    uploadBeautyData2Rank(that.data.faceLogId).then(data=>{
      console.log(data)
      that.setData({
        canUploadRank: false
      });
        wx.showToast({
          title: "上传成功！",
          icon: 'success',
          duration: 2000
        });
    },error=>{
      wx.showToast({
        title: "上传失败！",
        icon:"none",
        duration: 2000
      })
    });
  }
})

/**
 * 解析 返回值 "plant", "animal", "car", "dish"
 */
function parseSuccessRes(thisPage, resultData) {
  var json = JSON.parse(resultData.data);
  var imgInfo = new Array();

  if (json.code != 200) {
    imgInfo.push({ showTitle: "哇喔", showValue: "识别失败，请稍后再试！" });
    thisPage.setData({
      canUploadRank: false
    })
    return imgInfo;
  }

  var detectLog = json.data.detectLog;
  var beauty = detectLog.beauty;
  if (beauty == 0) {
    imgInfo.push({ showTitle: "MIMO", showValue: "这是外星人吗？我要报警了" });
    thisPage.setData({
      canUploadRank: false
    })
    return imgInfo;
  }

 
  thisPage.setData({
    faceLogId: detectLog.id
  })

  var age = detectLog.age != undefined ? detectLog.age : "错误";
  var beauty = detectLog.beauty != undefined ? detectLog.beauty : "错误";
  beauty = Math.floor(beauty * 100) / 100;
  var sex = detectLog.sex;
  switch (sex) {
    case 2:
      sex = "女";
      break;
    case 1:
      sex = "男";
      break;
    default:
      sex = "未知";
  }
  imgInfo.push({ showTitle: "年龄", showValue: age });
  imgInfo.push({ showTitle: "颜值", showValue: beauty });
  imgInfo.push({ showTitle: "性别", showValue: sex });
  // imgInfo.push({ showTitle: "可信度", showValue: probability });
  return imgInfo;
}
