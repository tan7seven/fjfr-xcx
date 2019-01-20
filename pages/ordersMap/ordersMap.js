// pages/ordersMap/ordersMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //事件回调函数
  driving: function () {

    let _page = this;

    // 起点经纬度
    let latStart = wx.getStorageSync('latlngstart').lat;
    let lngStart = wx.getStorageSync('latlngstart').lng;

    // 终点经纬度
    let latEnd = wx.getStorageSync('latlngend').lat;
    let lngEnd = wx.getStorageSync('latlngend').lng;


    _page.setData({
      latitude: latStart,
      longitude: lngStart,
      scale: 16,
      markers: [{
        id: 0,
        latitude: latStart,
        longitude: lngStart,
        // 起点图标
        iconPath: '../image/location.png'
      },
      {
        id: 1,
        latitude: latEnd,
        longitude: lngEnd,
        // 终点图标
        iconPath: '../image/location.png'
      },
      ]
    });
    ``

    /**
     * 获取两点的距离
     */
    qqmapsdk.calculateDistance({
      to: [{
        latitude: latStart,
        longitude: lngStart
      }, {
        latitude: latEnd,
        longitude: lngEnd
      }],
      success: function (res) {
        console.log(res, '两点之间的距离：', res.result.elements[1].distance);
        _page.setData({
          resultDistance: res.result.elements[1].distance + '米'
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });

    //网络请求设置
    let opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: `https://apis.map.qq.com/ws/direction/v1/driving/?from=${latStart},${lngStart}&to=${latEnd},${lngEnd}&key=${qqmapsdk.key}`,
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        let ret = res.data
        if (ret.status != 0) return; //服务异常处理
        let coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        let kr = 1000000;
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (let i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        //设置polyline属性，将路线显示出来
        _page.setData({
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      }
    };
    wx.request(opt);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // console.log(options)
    //  console.log(options.jsonStr)
    //  console.log(options.strr)
    let item = JSON.parse(options.item)
    that.setData({
      orders: item
    })
    debugger
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