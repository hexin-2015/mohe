
module.exports.post = request;
module.exports.log = log;
module.exports.getSessionid = getSessionid;

function getSessionid(){
  var sessionid = wx.getStorageSync("sessionid");
  return sessionid;
}

function log(msg){
  var logs = wx.getStorageSync('logs') || [];
  var logMsg = Date.now()+":"+msg;
  logs.unshift(logMsg);
  wx.setStorageSync('logs', logs);
}


function request(url,data,res) {

  var sessionid = wx.getStorageSync("sessionid");
  data.sessionID = sessionid;
  wx.request({
    url: url,
    data:data,
    success:function(res){
      console.log("res",res)
    },
    fail:function(res){
      
      log("失败请求参数：" + data + "返回消息:" + res);
      
    }


  })
}