//Page Object
// 引入用来发送请求的
import{ request } from "../../request/index.js"

Page({
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航数组
    cateList:[],
    // 楼层数据
    floorList:[]
    
  },
  // 页面开始加载 就会触发
  //options(Object)
  onLoad: function(options){
    // 1.发送异步请求获取轮播图数据
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     // console.log(result)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
    
  },
  // 获取轮播图的数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result
      })
    })
  },

  // 获取分类航的数据
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        cateList:result
      })
    })
  },

   // 获取楼层的数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result
      })
    })
  }

});