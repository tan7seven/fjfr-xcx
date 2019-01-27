// 引入配置
var config = require('../../config');

function formatDate(now) {
  var datenow = new Date(now);
  var year = datenow.getFullYear();
  var month = datenow.getMonth() + 1;
  var date = datenow.getDate();
  var hour = datenow.getHours();
  var minute = datenow.getMinutes();
  var second = datenow.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute; 
}
function getUserOpenid(_page){
  var that = _page;
  // 查看是否授权
  wx.getSetting({
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        // 改变 isHide 的值，显示授权页面
        that.setData({
          isHide: false
        });
        wx.login({
          success: res => {
            console.log("用户的code:" + res.code);
            wx.request({
              url: `${config.service.host}/wx/getOpenid.do?`,
              data: {
                code: res.code
              },
              success: res => {
                // 获取到用户的 openid
                console.log("service的sessionid:" + res.data);
                wx.setStorage({
                  key: 'sessionid',
                  data: res.data,
                })
               
              }
            });
          }
        });
      } else {
        that.setData({
          isHide: true
        });
      }
    }
  });
}
function getUserInfo(e,_page){
  if (e.detail.userInfo) {
    //用户按了允许授权按钮
    var that = _page;
    // 获取到用户的信息了，打印到控制台上看下
    console.log("用户的信息如下：");
    console.log(e.detail.userInfo);
    //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
    that.setData({
      isHide: false,
      user :{
        nickName: e.detail.userInfo.nickName,
        country: e.detail.userInfo.country,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city,
        gender: e.detail.userInfo.gender,
        language: e.detail.userInfo.language
      }
    });
    wx.getUserInfo({
      success: function (res) {
        wx.login({
          success: res => {
            console.log("用户的code:" + res.code);
            wx.request({
              url: `${config.service.host}/wx/addUser.do?`,
              data:{
                code: res.code,
                nickName: e.detail.userInfo.nickName,
                country: e.detail.userInfo.country,
                province: e.detail.userInfo.province,
                city: e.detail.userInfo.city,
                gender: e.detail.userInfo.gender,
                language: e.detail.userInfo.language,
              },
              success: res => {
                console.log("service的sessionid:" + res.data);
                wx.setStorage({
                  key: 'sessionid',
                  data: res.data,
                })
              }
            });
          }
        });
      }
    });
  } else {
    //用户按了拒绝按钮
    wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      showCancel: false,
      confirmText: '返回授权',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击了“返回授权”');
        }
      }
    });
  }
}
module.exports = {
  formatDate: formatDate,
  getUserOpenid: getUserOpenid,
  getUserInfo: getUserInfo
}