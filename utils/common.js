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

export const showToast=(res,title='',icon='none')=>{
  if (undefined == res.ext) {
    return;
  }
  title = title+' 恭喜您，获得'+res.ext.getGold+'个金币';
  
   wx.showToast({
     title: title,
     icon:icon,
     duration:2000
   })
};
export const showToastNormal = (title = '', icon = 'none') => {
  wx.showToast({
    title: title,
    icon: icon,
    duration: 2000
  })
};