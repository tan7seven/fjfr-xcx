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
    show: false,
    isHide: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageSrc: '../../index/image/user.png',
    imageMode: 'scaleToFill'
  },
  //点击联系名称、手机号码
  onChangeUserMsg : function(options){
    console.log("123");
    var _page = this;
    _page.setData({
      show :true
    })
  },
  changeNickName : function(e){
    var _page = this;
    _page.setData({
      changeedNickName: e.detail
    })
  },
  changePhone: function (e) {
    var _page = this;
    _page.setData({
      changeedPhone: e.detail
    })
  },
  onCancelDialog : function(){
    var _page = this;
    _page.setData({
      show: false
    })
  },
  onConfirmDialog: function () {
    var _page = this;
    _page.setData({
      show: false
    })
    if (_page.data.changeedNickName){
      _page.setData({
        ["userMsg.nickName"]: _page.data.changeedNickName
      });
    }
    if (_page.data.changeedPhone) {
      _page.setData({
        ["userMsg.phone"]: _page.data.changeedPhone
      });
    }
    wx.getStorage({
      key: 'sessionid',
      success: function (res) {
        var sessionid = res.data
        if (sessionid == null || sessionid == "") {
          Dialog.alert({
            message: '请重新登录！'
          });
          return;
        } else {
          var header = { 'content-type': 'application/x-www-form-urlencoded', 'cookie': 'JSESSIONID=' + sessionid, 'content-type': 'application/json' }
          wx.request({
            url: `${config.service.host}/user/modifyUser.do`,
            data:{
              nickName: _page.data.userMsg.nickName,
              phone: _page.data.userMsg.phone
            },
            header: header,
            success(res) {
              var obj = JSON.parse(res.data.info);
              _page.setData({
                userMsg: obj
              })
            },
            fail() {
              Dialog.alert({
                message: '系统错误！'
              });
              return;
            }
          })
        }
      },
    })
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
    var _page = this;
    setTimeout(function () {
      wx.getStorage({
        key: 'sessionid',
        success: function (res) {
          var sessionid = res.data
          if (sessionid == null || sessionid == "") {
            Dialog.alert({
              message: '请重新登录！'
            });
            return;
          } else {
            var header = { 'content-type': 'application/x-www-form-urlencoded', 'cookie': 'JSESSIONID=' + sessionid, 'content-type': 'application/json' }
            wx.request({
              url: `${config.service.host}/user/getUser.do`,
              header: header,
              success(res) {
                _page.setData({
                  userMsg: res.data
                })
                console.log(res)
              },
              fail() {
                Dialog.alert({
                  message: '系统错误！'
                });
                return;
              }
            })
          }
        },
      })
    }, 100)
    
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