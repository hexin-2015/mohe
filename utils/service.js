/**
 * 此文件管理项目所有接口
 */
import { get, post, put, del, uploadFile} from './network';

/**
 * 服务器根域名
 * @type {string}
 */
export const API_ROOT = 'https://mohe.ipnewgame.com';

//----------------------------排行榜相关------------------------------

/**
 * 获取颜值巅峰榜数据
 */
export const getMaxBeautyRank = () => post(`${API_ROOT}/rank/maxBeauty`);

/**
 * 获取颜值低谷榜数据
 */
export const getMinBeautyRank = () => post(`${API_ROOT}/rank/minBeauty`);

/**
 * rank/maxGold
 * 获取财富榜数据
 */
export const getMaxGoldRank = () => post(`${API_ROOT}/rank/maxGold`);

/**
 * 上传颜值数据，参与颜值排行 upload/doRankBeauty
 * faceLogId：图片识别ID值
 */
export const uploadBeautyData2Rank = ( faceLogId) => post(`${API_ROOT}/upload/doRankBeauty`, { "faceLogId": `${faceLogId}` });

//----------------------------上传图片相关------------------------------
/**
 * 上传图片（各类图片） upload/weixinsave
 * imgPath:图片地址
 * imgType:图片类型  ["plant", "animal", "car", "dish", "face"]
 */
export const uploadImg = (imgPath, imgType) => uploadFile(`${API_ROOT}/upload/weixinsave`, imgPath, { "imgType": `${imgType}`});


//----------------------------评论|简介相关------------------------------
/**
 * 添加评论comment/add
 */
export const addIntrduce = ( imgType, kindid, content) => post(`${API_ROOT}/comment/add`, { "imgType": `${imgType}`, "kindid": `${kindid}`, "content": `${content}`});

/**
 * 修改评论comment/update
 */
export const updateIntrduce = (imgType, id, content) => post(`${API_ROOT}/comment/update`, { "imgType": `${imgType}`, "id": `${id}`, "content": `${content}` });

/**
 * 获取所有评论comment/get
 */
export const getAllIntroduce = (imgType, kindid) => post(`${API_ROOT}/comment/get`, { "imgType": `${imgType}`, "kindid": `${kindid}` });

/**
 * 点赞comment/like
 */
export const addLike = (imgType, kindid, id) => post(`${API_ROOT}/comment/like`, { "imgType": `${imgType}`, "kindid": `${kindid}`, "id": `${id}`});


//----------------------------用户信息相关------------------------------
/**
 * 上传用户信息 login/uploadUserInfo
 * userInfo={
 * gender:"性别",
 * nickName:"昵称",
 * avatarUrl:"头像"，
 * }
 */
export const uploadUserInfo = (gender, nickName, avatarUrl) => post(`${API_ROOT}/login/uploadUserInfo`, { "gender": `${gender}`, "nickName": `${nickName}`, "avatarUrl": `${avatarUrl}`});

/**
 * /login/weixin
 * 根据微信登录返回的Code，获取用户信息相关的openId, sessionKey, unionId
 */
export const getWXUserInfoByCode = (code) => post(`${API_ROOT}/login/weixin`, {"code":`${code}`});

/**
 * user/info
 * 获取mimo用户信息：
 * mimoUserInfo={
 * 
 * }
 */
export const getMimoUserInfo = () => post(`${API_ROOT}/user/info`);


/**
 * 用户反馈意见 user/advice
 */
export const feedbackInfo = (advType, content, contact) => post(`${API_ROOT}/user/advice`, { "type": `${advType}`, "content": `${content}`, "contact": `${contact}` });

