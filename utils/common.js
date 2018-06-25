export const log = ()=>{
  var logs = wx.getStorageSync('logs') || [];
  var logMsg = Date.now() + ":" + msg;
  logs.unshift(logMsg);
  wx.setStorageSync('logs', logs);
};

export const setSessionId = (sessionId) =>{
  wx.setStorageSync("sessionid", sessionId)
};

export const getSessionId =()=> {
  var sessionid = wx.getStorageSync("sessionid");
  return sessionid;
};
