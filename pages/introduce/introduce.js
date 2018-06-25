// pages/introduce/introduce.js
import { addIntrduce, updateIntrduce, getAllIntroduce, addLike } from "../../utils/service";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgType: "plant",
    kindid: "",
    itemList: [],
    imgInfo: "null",
    inputContent: "",
    modifyInfo: {},
    commentAddOrUpdateTitle: "添加评论"
  },

  onLoad: function (options) {
    this.setData({
      imgType: options.imgType,
      kindid: options.kindId
    });

    getAllComment(this)
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
   * 添加评论
   */
  onAddIntroduce: function(e) {
    console.log("--onAddIntroduce--" + e.detail.value.comment_text)

    if (e.detail.value.comment_text != undefined){
      this.setData({ inputContent: e.detail.value.comment_text });
    }

    if (this.data.inputContent == "") {
      wx.showToast({
        title: '请先输入内容',
      })
      return;
    }
    
    if (this.data.commentAddOrUpdateTitle == "添加评论") {
      addIntroduce(this, this.data.imgType, this.data.kindid, this.data.inputContent)
    } else {
      var id = this.data.modifyInfo.id      
      var content = this.data.inputContent
      updateIntroduce(this, this.data.imgType, id, content)
    }
    
  },

  
  /**
   * 点赞
   */
  onLike: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var isLiked = e.currentTarget.dataset.isLiked;
    console.log("--------isLiked------------" + isLiked)
    console.log("--------id------------" + id)
    if (isLiked) {
      wx.showToast({
        title: "你已经赞过了",
      });
      return;
    }
    addLike(this.data.imgType, this.data.kindid, id).then(data => {
      console.log(data)
      parseLikeSuccessRes(this, data);
    });
  },

  /**
   * 输入框失去焦点事件
   */
  onUserIntroduce: function (e) {
    console.log("--------onUserIntroduce------------" + e.detail.value)
    
    if (e.detail.value == "") {
      this.setData({
        inputContent: "",
        commentAddOrUpdateTitle: "添加评论"
      });
    } else {
      this.setData({ inputContent: e.detail.value });
    }
  },


  /**
   * 修改自己的评论
   */
  onModify: function (e) {
    console.log("--------onModify------------")
    var that = this;
    var id = e.currentTarget.id;
    var content = e.currentTarget.dataset.content;
    
    var commUpdate = { "id" : id,   "content": content}
    if (content != undefined) {
      this.setData({ inputContent: content ,
          commentAddOrUpdateTitle: "修改评论",
                       modifyInfo: commUpdate});
      
    } else {
      console.log("--------content is null------------")
    }
  },
})


function getAllComment(thisPage) {
  getAllIntroduce(thisPage.data.imgType, thisPage.data.kindid).then(data => {
    console.log(data)
    var resInfo = parseSuccessRes(thisPage, data);
    thisPage.setData({ imgInfo: resInfo });

    if (resInfo.itemList != undefined) {
      thisPage.setData({ itemList: resInfo.itemList });
    }
  });
}


function addIntroduce(thisPage, imgType, kindid, content) {

  console.log("--------addIntroduce------------")
  addIntrduce(imgType, kindid, content).then(data => {
    console.log(data)
    console.log("--------addIntroduce success------------")
    parseAddSuccessRes(thisPage, data)
  });
  
}

function updateIntroduce(thisPage, imgType, commId, content) {

  console.log("--------updateIntroduce------------")

  updateIntrduce(imgType, commId, content).then(data => {
    console.log(data)
    console.log("--------updateIntroduce success------------")
    parseUpdateSuccessRes(thisPage, data)
  });

}

/**
 * 解析 返回的评论
 */
function parseSuccessRes(thisPage, resultData) {
  var json = JSON.parse(JSON.stringify(resultData))
  var imgInfo = {};
  console.log(json)
  if (json.code != 200) {
    imgInfo.isOK = false
    imgInfo.msg = "拉取评论失败..."
    console.log("拉取评论失败" )
    return imgInfo;
  }

  imgInfo.isOK = true
  imgInfo.msg = "拉取评论成功！"
  imgInfo.itemList = json.data
  
  return imgInfo
}

/**
 * 解析返回添加评论数据
 */
function parseAddSuccessRes(thisPage, resultData) {
  var json = JSON.parse(JSON.stringify(resultData))
  var retInfo = {};
  console.log(json)
  if (json.code != 200) {
    retInfo.isOK = false
    retInfo.msg = "添加评论失败!"
    if (json.code == 409) {
      retInfo.msg = "你已经评论过了!"
    }
    
    console.log(retInfo.msg)
    wx.showToast({
      title: retInfo.msg,
    })
    return retInfo;
  }

  retInfo.isOK = true
  retInfo.msg = "添加评论成功!"
  wx.showToast({
    title: retInfo.msg,
  })

  thisPage.setData({ inputContent : ""})

  getAllComment(thisPage);

  return retInfo
}

/**
 * 解析返回修改评论数据
 */
function parseUpdateSuccessRes(thisPage, resultData) {
  var json = JSON.parse(JSON.stringify(resultData))
  var retInfo = {};
  console.log(json)
  if (json.code != 200) {
    retInfo.isOK = false
    retInfo.msg = "修改评论失败!"

    console.log(retInfo.msg)
    wx.showToast({
      title: retInfo.msg,
    })
    return retInfo;
  }

  retInfo.isOK = true
  retInfo.msg = "修改评论成功!"
  wx.showToast({
    title: retInfo.msg,
    duration: 1500,
    icon: ""
  })

  thisPage.setData({
    inputContent: "",
    commentAddOrUpdateTitle: "添加评论"
  });

  getAllComment(thisPage);

  return retInfo
}

/**
 * 解析返回点赞数据
 */
function parseLikeSuccessRes(thisPage, resultData) {
  var json = JSON.parse(JSON.stringify(resultData))
  var retInfo = {};
  console.log(json)
  if (json.code != 200) {
    retInfo.isOK = false
    retInfo.msg = "点赞失败!"
    if (json.code == 409) {
      retInfo.msg = "你已经点过赞了!"
    }

    console.log(retInfo.msg)
    wx.showToast({
      title: retInfo.msg,
    })
    return imgInfo;
  }

  retInfo.isOK = true
  retInfo.msg = "点赞成功!"
  wx.showToast({
    title: retInfo.msg,
  })

  getAllComment(thisPage);

  return retInfo
}