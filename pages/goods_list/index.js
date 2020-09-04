// pages/goods_list/index.js

/*  用户上滑页面 滚动条触底 开始加载下一页数据
 1.找到滚动条触底事件 微信小程序官方开发文档寻找
 2.判断还有没有下一页数据
 3.假如没有下一页数据 弹出一个提示
 4.假如还有下一页数据 来加载下一页数据
 */

import{ request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:3,
        value:"价格",
        isActive:false
      }
    ],
    goods_list:[]
  },
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();

  },
  // 获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    // 获取总条数
    const total=res.total;
    // 计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages);

    this.setData({
      //拼接数组
      goods_list:[...this.data.goods_list,...res.goods]
    })
    wx.stopPullDownRefresh();/* 关闭下拉刷新 */
  }
  ,
  // 标题点击事件 从子组件传递过去
  handleTabsItenChange(e){
    // 1获取被点击的标题索引
    const {index}=e.detail;
    // 2修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3.赋值到data中
    this.setData({
      tabs
    })
  },
  onReachBottom(){
    //判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // console.log("没有下一条数据")
      wx.showToast({title: '没有下一页了'});
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    // console.log('sss');
    // 1.重置数组
    this.setData({
      goods_list:[]
    })
    // 2.重置页码
    this.QueryParams.pagenum=1;
    // 3.发送请求
    this.getGoodsList();
  }
})