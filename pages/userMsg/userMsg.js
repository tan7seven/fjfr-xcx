// pages/userMsg/userMsg.js
// 引入配置
var config = require('../../config');
var util = require('../utils/util.js');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    isHide: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageSrc: '../../index/image/user.png',
    imageMode: 'scaleToFill',
    userName : '魏佳郑',
    userPhone : '18094010674',
    userIntegral : '100',
    userType: { 0: '乘客', 1: '司机' }
  },
  modifyPhone : function(options){
    console.log("123");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    util.getUserOpenid(this);
  },

  bindGetUserInfo: function (e) {
    util.getUserInfo(e,this);
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