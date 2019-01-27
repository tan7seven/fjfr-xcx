// 引入配置
var config = require('../../../config');
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabsIndex: "0",
    isHide: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    redRec: "../../../index/image/red.png",
    greenUrl: "../../../index/image/green.png",
    timeUrl: "../../../index/image/time.png",
    rightUrl: "../../../index/image/right.png",
    ordersList: []
  },

  toOrdersMap: function (e) {
    let id = e.currentTarget.dataset.id;
    let item = e.currentTarget.dataset.item;
    let _item = JSON.stringify(item)

    wx.navigateTo({
      url: '../ordersMap/ordersMap?item=' + _item
    })
  },




  onLoad: function () {
    util.getUserOpenid(this);
    var _page = this;
    //获取订单列表
    wx.request({
      url: `${config.service.host}/orders/getList.do`,
      data: {
        rows: 10,
        page: 1,
        ordersType: "0"
      },
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          _page.data.ordersList.push(res.data[i]);
        }
        _page.setData({
          ordersList: _page.data.ordersList
        })

      },
      fail() {
        Dialog.alert({
          message: '系统错误！'
        });
        return;
      }
    })

  },
  changeTabs: function (e) {
    var _page = this;
    _page.setData({
      tabsIndex: e.detail.index
    })
    //获取订单列表
    wx.request({
      url: `${config.service.host}/orders/getList.do`,
      data: {
        rows: 10,
        page: 1,
        ordersType: e.detail.index

      },
      success(res) {

        _page.setData({
          ordersList: res.data
        })
      },
      fail() {
        Dialog.alert({
          message: '系统错误！'
        });
        return;
      }
    })
  },
  bindGetUserInfo: function (e) {
    util.getUserInfo(e, this);
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
    console.log("页面相关事件处理函数--监听用户下拉动作");
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数");
    var _page = this;
    var tabListLength = 0;
    var q = "";
    if (_page.data.tabsIndex == "0") {
      if (_page.data.queryParam1) {
        q = _page.data.queryParam1;
      }
      for (let i = 0; i < _page.data.ordersList.length; i++) {
        if ("人找车" == _page.data.ordersList[i].ordersType) {
          tabListLength++;
        }
      }
    } else if (_page.data.tabsIndex == "1") {
      if (_page.data.queryParam2) {
        q = _page.data.queryParam2;
      }
      for (let i = 0; i < _page.data.ordersList.length; i++) {
        if ("车找人" == _page.data.ordersList[i].ordersType) {
          tabListLength++;
        }
      }
    }
    //获取订单列表
    if ((Math.ceil(tabListLength / 10)) == (tabListLength / 10) && tabListLength != 0) {
      wx.request({
        url: `${config.service.host}/orders/getList.do`,
        data: {
          rows: 10,
          page: Math.ceil(tabListLength / 10) + 1,
          q: q,
          ordersType: _page.data.tabsIndex
        },
        success(res) {
          for (let i = 0; i < res.data.length; i++) {
            _page.data.ordersList.push(res.data[i]);
          }
          _page.setData({
            ordersList: _page.data.ordersList
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})