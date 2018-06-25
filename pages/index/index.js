//index.js

import { uploadUserInfo, getMimoUserInfo} from "../../utils/service";
import { getSessionId } from "../../utils/common";
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    beauty:0,
    gold:0,
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    getMimoUserInfo().then(res => {
// beauty: 0, gender: 1, gold: 21, nickName: "茂茂"
      that.setData({
        beauty: res.data.beauty,
        gold: res.data.gold
      })
    });
   

    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo == undefined){
      return;
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //更新用户数据
    uploadUserInfo(e.detail.userInfo.gender,e.detail.userInfo.nickName,e.detail.userInfo.avatarUrl);
  },
  onShow: function(){
    
  },
  chargeMoney: function () {
    if (getApp().globalData.isIphone) {
      wx.showToast({
        title: 'iPhone用户暂不支持充值哦~',
        icon: 'none'
      })
    } else {
      // wx.navigateTo({
      //   url: '../sub_pages/pay/pay',
      // })
    }
  },
})
