//app.js
// var host = "https://mohe.ipnewgame.com";

import { getWXUserInfoByCode } from "./utils/service";
import { setSessionId } from "./utils/common";

App({
  onLaunch: function () {
    // 展示本地存储能力
    
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        getWXUserInfoByCode(res.code).then(data=>{
          // console.log(data);
          that.globalData.login = true; 
          setSessionId(data.data.sessionID)
        });
       
      }
    })
    // 获取用户信息


    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    //获取手机信息
    wx.getSystemInfo({
      success: function (res) {
        var str = res.model;
        if (str.search("iPhone") != -1) {
          console.log('iphone~~~')
          that.globalData.isIphone = true;
        } else {
          console.log('no iphone~~~')
          that.globalData.isIphone = false;
        }
      },
    })
    
  },
  globalData: {
    login:false,
    userInfo: null,
    isIphone:false,
    // host:host
  }
})

