// pages/rank/index.js
import { getMaxBeautyRank, getMinBeautyRank, getMaxGoldRank } from "../../utils/service";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    vertical: false,
    rankTypes: ['颜值巅峰榜', '颜值低谷榜','财富榜'],
    activeIndex:0,
    ranks:[],
    hiddenmodalput: true,
    previewImageUrl:"",
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    getMaxBeautyRank().then(res=>{
      // console.log(res.data)
      var topRankArray = 'ranks[0]'
      that.setData({
        [topRankArray]: res.data
      })
    });
    
    getMinBeautyRank().then(res=>{
      // console.log(res.data)
      var minRankArray = 'ranks[1]'
      that.setData({
        [minRankArray]: res.data
      })
    });

    getMaxGoldRank().then(res=>{
      var maxGikdRankArray = 'ranks[2]'
      that.setData({
        [maxGikdRankArray]: res.data
      })
    });
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("---------------onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("---------------onShow")
    console.log(app.globalData)
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // requestTask.abort()
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
    console.info("==================下拉刷新=================");
    var that = this;
    if (0 == this.data.activeIndex){
      getMaxBeautyRank().then(res => {
        // console.log(res.data)
        var topRankArray = 'ranks[0]'
        that.setData({
          [topRankArray]: res.data
        })
      });  
    } else if (1 == this.data.activeIndex){
      getMinBeautyRank().then(res => {
        // console.log(res.data)
        var minRankArray = 'ranks[1]'
        that.setData({
          [minRankArray]: res.data
        })
      });
    } else if (2 == this.data.activeIndex){
      getMaxGoldRank().then(res => {
        var maxGikdRankArray = 'ranks[2]'
        that.setData({
          [maxGikdRankArray]: res.data
        })
      });
    }

    wx.stopPullDownRefresh();
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
   *  swiper change event
   */
  onSwiperChange: function (event) {
    // console.log(event.detail)
    var currentRanks=this.data.ranks
    console.log(currentRanks)
    this.setData({
      activeIndex: event.detail.current,
    })
  },

  /**
   *  swiper change animationfinish event
   */
  onSwiperChangeAnimationFinish: function (event) {
    
  },
  previewImage: function (e) {
    var that = this
    // var previewImageUrl1= e.currentTarget.dataset.url
    // wx.previewImage({
    //   current: previewImageUrl1,
    //   urls: [previewImageUrl1]
    // })

    wx.hideTabBar({
      
    })
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      previewImageUrl: e.currentTarget.dataset.url
    })  
  },
  closePreviewImageWindow:function(){
    wx.showTabBar({
      
    })
    this.setData({
      hiddenmodalput: true
    })
  },
 
  goLeft:function(e){
    var tempIndex=0;
    if (this.data.activeIndex < this.data.rankTypes.length - 1){
      tempIndex = this.data.activeIndex+1;
    } else if (this.data.rankTypes.length - 1 == this.data.activeIndex){
      wx.showToast({
        title: '已到最左边啦！！！',
        icon:'none'
      });
      return;
    }

    this.setData({
      currentIndex: tempIndex
    });
  },
  goRight: function (e) {
    var tempIndex = 0;
    if (0 < this.data.activeIndex) {
      tempIndex = this.data.activeIndex - 1;
    } else if (0== this.data.activeIndex) {
      tempIndex = this.data.rankTypes.length - 1;
    }

    this.setData({
      currentIndex: tempIndex
    });
  },
})