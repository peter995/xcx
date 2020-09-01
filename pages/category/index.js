// pages/category/index.js

import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currenIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop:0
  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.先判断一下本地存储中有没有旧数据
    // {time:Data,now(),data:[...]}
    // 2.没有旧数据 直接发送新请求
    // 3.有旧数据 同时 旧数据没有过期 就使用 本地存储中的旧数据

    // 1.获取本地存储中的数据 （小程序也是存储在本地存储 技术）
    const Cates = wx.getStorageSync("cates");
    // 2.判断
    if(!Cates){
      // 不存在 发送请求获取数据
      this.getCates();
    }else{
      // 有旧的数据 定义过期时间 10s改成5分钟
      if(Date.now()-Cates.time>1000*10){
        // 重新发送请求
        this.getCates();
      }else{
        this.Cates =Cates.data;

        let leftMenuList = this.Cates.map(v => v.cat_name);

        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      
      }
      
    }

  },
  async getCates() {
    // request({
    //   url: "/categories"
    // })
    //   .then(res => {
    //     this.Cates = res.data.message;

    //     // 把接口的数据存入到本地中
    //     wx.getStorageSync("cates",{time:Date.now(),data:this.Cates})

    //     //构造左侧的大菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);

    //     // 构造右侧商品数据
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    // 1.使用es7的async await来发送请求
    const res = await request({url:"/categories"})
    this.Cates = res;

        // 把接口的数据存入到本地中
        wx.getStorageSync("cates",{time:Date.now(),data:this.Cates})

        //构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);

        // 构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    // console.log(e); 
    // 1.获取被点击身上的索引
    // 2.给data中的currentIndex赋值
    // 3.根据不同的索引来渲染右侧的商品内容  
    const { index } = e.currentTarget.dataset;
 
    let rightContent = this.Cates[index].children;

    this.setData({
      currenIndex: index,
      rightContent,
     // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop:0
    })
   
  }
})