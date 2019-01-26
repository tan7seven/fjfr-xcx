var util = require('../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHide: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    redRec:"../../index/image/red.png",
    greenUrl:"../../index/image/green.png",
    timeUrl: "../../index/image/time.png",
    rightUrl: "../../index/image/right.png",
    ordersList:[{
      ordersType:"人找车",
      ordersState:"等待中",
      userName: "魏佳郑",
      userPhone: "18094010674",
      startAddress: "福建省福州市福清市一拂街7号",
      startName: "福清环球商业中心",
      startLatitude: 25.71964,
      startLongitude: 119.38349,
      endAddress: "福建省福州市福清市锦云街附近",
      endName: "成龙步行街",
      endLatitude: 25.719881,
      endLongitude: 119.3798,
      startTime: "2019-1-18 22:15",
      endTime: "2019-1-18 22:15",
      peopleNumber: 4,
      remark: "备注信息",
      ordersType: "1",
      ordersState: ""
    },{
        ordersType: "人找车",
        ordersState: "已完成",
        userName: "魏佳郑",
        userPhone: "18094010674",
        startAddress: "福建省福州市福清市一拂街7号",
        startName: "福清环球商业中心",
        startLatitude: 25.71964,
        startLongitude: 119.38349,
        endAddress: "福建省福州市福清市锦云街附近",
        endName: "成龙步行街",
        endLatitude: 25.719881,
        endLongitude: 119.3798,
        startTime: "2019-1-18 22:15",
        endTime: "2019-1-18 22:15",
        peopleNumber: 4,
        remark: "备注信息",
        ordersType:"0",
        ordersState:""
      }]
  },

  toOrdersMap: function (e){
    let id = e.currentTarget.dataset.id;
    let item = e.currentTarget.dataset.item;
    let _item = JSON.stringify(item)
    
    wx.navigateTo({
      url: '../ordersMap/ordersMap?item=' + _item
    })
  },




  onLoad: function () {
    util.getUserOpenid(this);
    
  },
  //关键字搜索参数
  changeParam1: function (event) {
    var _page = this;
    _page.setData({
      queryParam1: event.detail
    })
  },
  changeParam2 :function (event){
    var _page = this;
    _page.setData({
      queryParam2: event.detail
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