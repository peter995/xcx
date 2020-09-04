// pages/goods_detail/index.js
// 引入发送请求的
import{ request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:'/goods/detail',data:{goods_id}});
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          // iphone部分手机 不识别 webp图片格式
          // 最好找到后台 让他进行修改
          // 临时修改 确保后台存在 1.webp =>1.jpg
          goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:goodsObj.pics
       }
      
    })
  },
  // 点击轮播图 放大预览
  handlePrevewImage(e){
    // 1.先构造要预览的图片数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    // 2.接收传递过的图片
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd(){
    // 1.获取缓存中的购物车 数组
    let cart=wx.getStorageSync("cart")||[];
    // 2.判断 商品对象是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id==this.GoodsInfo.goods_id);
    if(index===-1){
      // 3.不存在 第一次添加
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo);
    }else{
      // 4.已经存在购车 num++
      cart[index].num++;
    }
    // 5.把购物车重新添加回缓存中
    wx.setStorageSync("cart",cart);
    // 6.弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止手抖 疯狂点击按钮
      mask:true
    });
  }
})