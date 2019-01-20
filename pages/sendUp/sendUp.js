var util = require('../utils/util.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    userName : "魏佳郑",
    userPhone: "18094010674",
    columns: ['1', '2', '3', '4', '5', '6'],
    isStartOrEnd: "",
    minDate: new Date().getTime(),
    maxDate: new Date(2022, 10, 1).getTime(),
    currentDate: new Date().getTime()
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
      showPopupPeople :false
    })
  },
  //免责申明
  onDeclare :function(){
    wx.navigateTo({
      url: '../declare/declare'
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
    if (_page.data.userName == null || _page.data.userName ==""){
      Dialog.alert({
        message: '联系人姓名是必填！'
      }).then(() => {
        _page.setData({
          userNameFocus: true
        })
      });
      return;
    }
    if (_page.data.userPhone == null || _page.data.userPhone == "") {
      Dialog.alert({
        message: '手机号码是必填！'
      }).then(() => {
        _page.setData({
          userPhoneFocus: true
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
    console.log(_page.data.userName);
    console.log(_page.data.userPhone);
    console.log(_page.data.startPlace);
    console.log(_page.data.endPlace);
    console.log(_page.data.startTime);
    console.log(_page.data.endTime);
    console.log(_page.data.peopleNumber);
    console.log(_page.data.endAddress);
    console.log(_page.data.endName);
    console.log(_page.data.endLatitude);
    console.log(_page.data.endLongitude);
    console.log(_page.data.startAddress);
    console.log(_page.data.startName);
    console.log(_page.data.startLatitude);
    console.log(_page.data.startLongitude);
    console.log(_page.data.startTimeLong);
    console.log(_page.data.endTimeLong);
    wx.request({
      url: 'test.php', // 仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
    
  }
});
 