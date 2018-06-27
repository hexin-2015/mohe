// pages/feedback/feedback.js
import { feedbackInfo } from "../../utils/service";
import { showToast, showToastNormal } from "../../utils/common";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    feedTypeList: ["功能意见", "界面意见", "您的需求", "操作意见", "流量问题", "其他"],
    fd_contact: "",
    fd_content: "",
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

  /**
   * 点击反馈类型选择器
   */
  clickFeedType: function (e) {
    console.log("--------clickFeedType-------")
    this.setData({
      index: e.detail.value,
    })
  },

  /**
   * 提交反馈内容
   */
  onSubmitFeedback: function (e) {
    console.log("--------onSubmitFeedback-------")
    console.log(e.detail.value)
    var fdType = this.data.feedTypeList[this.data.index];
    var fdContent = e.detail.value.fd_content;
    var fdContact = e.detail.value.fd_contact;

    if (fdContent == undefined || fdContent == ""){
      showToastNormal("请先输入内容");
      return;
    }

    feedbackInfo(fdType, fdContent, fdContact).then(data => {
      console.log(data)
      var json = JSON.parse(JSON.stringify(data))
      var code = json.code;
      console.log(code)
      if (code == "200") {
        showToastNormal("提交反馈信息成功，感谢你的意见！");
        this.setData({
          fd_content : "",
          fd_contact : ""
        });
      } else {
        showToastNormal("提交反馈信息失败！");
      }
    });
  }
})

