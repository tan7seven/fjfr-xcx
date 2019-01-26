// 引入配置
var config = require('../../config');
var util = require('../utils/util.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    ordersType:{
      key:0,
      text:"人找车"
      },
    ordersTypeColumns: [{
      key: 0,
      text: "人找车"
    }, {
        key: 1,
        text: "车找人"
      }],
    isHide: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName : "魏佳郑",
    phone: "18094010674",
    columns: ['1', '2', '3', '4', '5', '6'],

    isStartOrEnd: "",
    minDate: new Date().getTime(),
    maxDate: new Date(2022, 10, 1).getTime(),
    currentDate: new Date().getTime()
  },
  onOrdersType :function(){
    var _page = this;
    _page.setData({
      showOrdersType: true
    })
  },
  onConfirmType :function(e){
    var _page = this;
    _page.setData({
      ordersType: e.detail.value,
      showOrdersType: false
    })
  },
  //出发地
  onStartPlace: function () {
    var _page = this;
    wx.chooseLocation({
      success: function (res) {
        _page.setData({
          startPlace: res.address + '-'+res.name,
          startAddress: res.address,
          startName: res.name,
          startLatitude: res.latitude,
          startLongitude: res.longitude
        });
      }
    });
  },
  //目的地
  onEndPlace: function () {
    var _page = this;
    wx.chooseLocation({
      success: function (res) {
        _page.setData({
          endPlace: res.address + '-' + res.name,
          endAddress: res.address,
          endName: res.name,
          endLatitude: res.latitude,
          endLongitude: res.longitude
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  //开始时间
  onStartTime: function () {
    var _page = this;
    _page.setData({
      isStartOrEnd: "start",
      minDate: new Date().getTime(),
      showPopupTime: true
      
    })
  },
  //结束时间
  onEndTime: function () {
    var _page = this;
    _page.setData({
      isStartOrEnd: "end",
      showPopupTime: true
    })
  },
  //时间-确认
  onTimeConfirm: function (event){
    var _page = this;
    console.log(event)  
    let formatTime = util.formatDate(event.detail)  
    if (_page.data.isStartOrEnd=="start"){
      _page.setData({
        startTimeLong: event.detail,
        startTime: formatTime,
        minDate: event.detail,
        showPopupTime: false
      })
    }else{
      _page.setData({
        endTimeLong: event.detail,
        endTime: formatTime,
        showPopupTime: false
      })
    }
  },
  //关闭弹出框
  onPeopleNumber: function (){
    var _page = this;
    _page.setData({
      showPopupPeople: true

    })
  },
  //人数确认
  onConfirmPeople: function (event) {
    var _page = this;
    _page.setData({
      peopleNumber: event.detail.value,
      showPopupPeople: false
    })
  },
  //关闭人数选择
  onClosePopup: function(){
    var _page = this;
    _page.setData({
      showPopupTime: false,
      showPopupPeople :false,
      showOrdersType:false
    })
  },
  //免责申明
  onDeclare :function(){
    wx.navigateTo({
      url: '../declare/declare'
    })
  },
  changeNeedMoney:function(e){
    var _page = this;
    _page.setData({
      needMoney: e.detail
    })
  },
  //备注修改
  changeRemark: function (event){
    var _page = this;
    _page.setData({
      remark:event.detail
    })
  },
  //点击行程发布
  getuserinfo: function (event){
    var _page = this;
    if (_page.data.nickName == null || _page.data.nickName ==""){
      Dialog.alert({
        message: '联系人姓名是必填！'
      }).then(() => {
        _page.setData({
          nickNameFocus: true
        })
      });
      return;
    }
    if (_page.data.phone == null || _page.data.phone == "") {
      Dialog.alert({
        message: '手机号码是必填！'
      }).then(() => {
        _page.setData({
          phoneFocus: true
        })
      });
      return;
    }
    if (_page.data.startPlace == null || _page.data.startPlace == "") {
      Dialog.alert({
        message: '出发地是必填！'
      });
      return;
    }
    if (_page.data.endPlace == null || _page.data.endPlace == "") {
      Dialog.alert({
        message: '目的地是必填！'
      });
      return;
    }
    if (_page.data.startTime == null || _page.data.startTime == "") {
      Dialog.alert({
        message: '开始时间是必填！'
      });
      return;
    }
    if (_page.data.endTime == null || _page.data.endTime == "") {
      Dialog.alert({
        message: '结束时间是必填！'
      });
      return;
    }
    wx.getStorage({
      key: 'sessionid',
      success: function(res) {
        var sessionid = res.data
        if (sessionid == null || sessionid == "") {
          Dialog.alert({
            message: '请重新登录！'
          });
          return;
        } else {
          var header = { 'content-type': 'application/x-www-form-urlencoded', 'cookie': 'JSESSIONID=' + sessionid, 'content-type': 'application/json'}
          wx.request({
            url: `${config.service.host}/orders/sendUp.do?`,
            header: header,
            data: {
              ordersType: _page.data.ordersType.key,
              nickName: _page.data.nickName,
              phone: _page.data.phone,
              startAddress: _page.data.startAddress,
              startName: _page.data.startName,
              startLatitude: _page.data.startLatitude,
              startLongitude: _page.data.startLongitude,
              endAddress: _page.data.endAddress,
              endName: _page.data.endName,
              endLatitude: _page.data.endLatitude,
              endLongitude: _page.data.endLongitude,
              startTime: _page.data.startTime,
              endTime: _page.data.endTime,
              peopleNumber: _page.data.peopleNumber,
              needMoney: _page.data.needMoney,
              remark: _page.data.remark
            },
            method: "POST",
            success(res) {
              Dialog.alert({
                message: res.data.info
              }).then(() => {
                if (res.data.result == 1) {
                  wx.switchTab({
                    url: '../../pages/userMsg/userMsg'
                  })
                }
              });;
            },
            fail(){
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
  onLoad: function () {
    util.getUserOpenid(this);
  },

  bindGetUserInfo: function (e) {
    util.getUserInfo(e, this);
  }
});
 