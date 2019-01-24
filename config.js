/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'localhost:8077';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    
    // 登录地址，用于建立会话
    loginUrl: `https://${host}/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `https://${host}/user`,

    // 测试的信道服务地址
    tunnelUrl: `https://${host}/tunnel`,
  },
  girUserInfo :function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          debugger
          wx.login({
            success: function (res) {
              debugger
              var code = res.code;//登录凭证
              if (code) {
                //2、调用获取用户信息接口
                wx.getUserInfo({
                  success: function (res) {
                    debugger
                    console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                    //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    wx.request({
                      url: 'https://xxxx.com/wxsp/decodeUserInfo',//自己的服务接口地址
                      method: 'post',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                      success: function (data) {

                        //4.解密成功后 获取自己服务器返回的结果
                        if (data.data.status == 1) {
                          var userInfo_ = data.data.userInfo;
                          console.log(userInfo_)
                        } else {
                          console.log('解密失败')
                        }

                      },
                      fail: function () {
                        console.log('系统错误')
                      }
                    })
                  },
                  fail: function () {
                    console.log('获取用户信息失败')
                  }
                })

              } else {
                console.log('获取用户登录态失败！' + r.errMsg)
              }
            },
            fail: function () {
              console.log('登陆失败')
            }
          })

        } else {
          console.log('获取用户信息失败')

        }

      }
    })
  }
};

module.exports = config;