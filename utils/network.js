/**
 * 基于Promise的网络请求库,包含GET POST请求，上传下载功能
 * 使用方法：
 * 先引入： import {get,post,...} from 本文件;
 * · get请求:    get("/index",{id:2}).then(data=>{}).catch(error=>{});
 * · post请求:    post("/index",{id:2}).then(data=>{}).catch(error=>{});
 * Promise详细介绍：
 * http://es6.ruanyifeng.com/#docs/promise
 */

import { getSessionId,showToast } from './common';

/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 */
export const get = (url, data, headers) => request('GET', url, data, headers);

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头
 */
export const post = (url, data, headers) => request('POST', url, data, headers);
/**
 * 发起put请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头
 */
export const put = (url, data, headers) => request('PUT', url, data, headers);
/**
 * 发起delete请求
 * @param url 请求路径 必填
 * @param data 请求参数 delete请求的参数会自动拼到地址后面
 */
export const del = (url, data, headers) => request('DELETE', url, data, headers);

export const uploadFile = (url,filePath, formData) => {
  formData.sessionID = getSessionId();
  console.log("uploadFile============>");
  console.info(url,filePath,formData);
  return new Promise((resolve, reject) => {
    const response = {};
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'xx',
      formData: formData,
      success: (res) => response.success = res,
      fail: (error) => response.fail = error,
      complete:function(){
        wx.hideLoading();
        console.group('==============>上传文件开始<==============');
        console.info("uploadFile", url);
        if (response.success) {
          console.info('上传文件成功', response.success);
          resolve(response.success)
        } else {
          console.info('上传文件失败', response.fail);
          reject(response.fail)
        }
        console.info('==============>上传文件结束<==============');
        console.groupEnd();
      }
    });
    //loading
    wx.showLoading({
      title: '玩命识别中',
      mask: true
    })
  });
};

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头  {'content-type': 'application/x-www-form-urlencoded'}|{'Content-Type': 'application/json'}
 * @returns {Promise}
 */
export function request(method, url, data={}, header = { 'content-type': 'application/x-www-form-urlencoded'}) {
  // console.info("data========", data);
  console.info(method, url);

  data.sessionID = getSessionId();
    return new Promise((resolve, reject) => {
        const response = {};
        wx.request({
            url, method, data, header,
            success: (res) => response.success = res.data,
            fail: (error) => response.fail = error,
            complete() {
                console.group('==============>请求开始<==============');
                console.info(method, url);
                if (response.success) {
                    console.info('请求成功', response.success);
                    showToast(response.success);
                    resolve(response.success)
                } else {
                    console.info('请求失败', response.fail);
                    reject(response.fail)
                }
                console.info('==============>请求结束<==============');
                console.groupEnd();
                wx.hideLoading();
            },
        });
    });

    //loading
    wx.showLoading({
      title: '数据请求中...',
      mask: true
    })


}
