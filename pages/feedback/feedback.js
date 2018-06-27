// pages/feedback/feedback.js
import { uploadBeautyData2Rank, uploadImg } from "../../utils/service";
import { showToast } from "../../utils/common";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedTypeSel: "功能意见",
    index: 0,
    feedTypeList: ["功能意见", "界面意见", "您的需求", "操作意见", "流量问题", "其他"],
    contactInfo: "1234567890",
    textarea_focus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ textarea_focus: true})
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

  clickFeedType: function (e) {
    console.log("--------clickFeedType-------")
    this.setData({
      index: e.detail.value
    })
  },

  onSubmitFeedback: function () {
    console.log("--------onSubmitFeedback-------")
  }
})

