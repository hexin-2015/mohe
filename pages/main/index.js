// pages/main/index.js
var ImgType = ["plant", "animal", "car", "dish", "face"];
module.exports.ImgType = ImgType;

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    itemList: [{
      id: ImgType[0],
      title: '植物识别',
      bindtap:"onClickButton",
      imgUrl:"../../image/jpg/plant.jpg"
    },
      {
        id: ImgType[1],
        title: '动物识别',
        bindtap: "onClickButton",
        imgUrl: "../../image/jpg/animal.jpg"
      },
      {
        id: ImgType[2],
        title: '车型识别',
        bindtap: "onClickButton",
        imgUrl: "../../image/jpg/car.jpg"
      },
      {
        id: ImgType[3],
        title: '卡路里识别',
        bindtap: "onClickButton",
        imgUrl: "../../image/jpg/food.jpg"
      },
      {
        id: ImgType[4],
        title: '颜值测试',
        bindtap: "onClickButton",
        imgUrl: "../../image/jpg/face.jpg"
      },
     
    ]
      
  },
  onClickButton: function (e) {
    var kind = e.currentTarget.id ;
    var title = e.currentTarget.dataset.title;
    // var uploadUrl = "../uploadImg/index?id=" + kind + "&title=" + title;

    var _this = this;
    
    if (kind == ImgType[4]) {
      wx.showActionSheet({
        itemList: ['拍照','从手机相册选择'],
        success:function(res){
          console.log(res.tapIndex)
          var isUpload = false;
          if (0==res.tapIndex){
            isUpload=true;
          }else{
            isUpload = false;
          }
          selectImg(_this, kind, title,isUpload);
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }else{
      selectImg(this, kind, title);
    }
    
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
  
  }
})

function selectImg(_this, kind, title,isUpload=false){
  var sourceType = ['album', 'camera'];
  if (kind == ImgType[4]) {
    if (isUpload){
      sourceType = ['camera'];
    }else{
      sourceType = ['album'];
    }
    
  }
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.info("res======",res);
      _this.setData({ hasSelected: true })

      var tempImgUrl = '../uploadImg/index?imgUrl=' + res.tempFilePaths[0] + "&id=" + kind + "&title=" + title
      if (kind == ImgType[4]) {
        tempImgUrl = '../facescore/facescore?imgUrl=' + res.tempFilePaths[0] + "&isUpload=" + isUpload
      }
      wx.navigateTo({
        url: tempImgUrl
      })
    },
  })
}