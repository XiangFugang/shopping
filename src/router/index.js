import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  //父路由-------------------------------------->
  {
    path: "/",
    redirect: "/Home"
  },
  //登录注册
  {
    path: "/LoginRegistration",
    name: "LoginRegistration",
    component: () => import("../views/LoginRegistration")
  },
  //定位
  {
    path: "/Location",
    name: "Location",
    component: () => import("../views/Location")
  },
  //最近浏览
  {
    path: "/RecentlyBrowse",
    name: "RecentlyBrowse",
    component: () => import("../views/RecentlyBrowse")
  },
  //评价中心
  {
    path: "/EvaluationCenter",
    name: "EvaluationCenter",
    component: () => import("../views/EvaluationCenter")
  },
  //评价详情
  {
    path: "/Evaluationdetails",
    name: "Evaluationdetails",
    component: () => import("../views/Evaluationdetails")
  },
  //晒单评价页
  {
    path: "/Dryinglist",
    name: "Dryinglist",
    component: () => import("../views/Dryinglist")
  },
  //订单结算
  {
    path: "/OrderSettlement",
    name: "OrderSettlement",
    component: () => import("../views/OrderSettlement")
  },
  //个人资料
  {
    path: "/personalData",
    name: "personalData",
    component: () => import("../views/personalData")
  },
  //我的订单
  {
    path: "/MyOrder",
    name: "MyOrder",
    component: () => import("../views/MyOrder")
  },
  //全部订单
  {
    path: "/Allorders",
    name: "Allorders",
    component: () => import("../views/Allorders")
  },
  //商品详情
  {
    path: "/CommodityDetails",
    name: "CommodityDetails",
    component: () => import("../views/CommodityDetails")
  },
  //首页框架
  {
    path: "/frame",
    name: "frame",
    component: () => import("../views/frame")
  },
  //收藏商品
  {
    path: "/MerchandiseCollection",
    name: "MerchandiseCollection",
    component: () => import("../views/MerchandiseCollection")
  },
  //地址管理
  {
    path: "/AddressManagement",
    name: "AddressManagement",
    component: () => import("../views/AddressManagement")
  },
  //地址编辑
  {
    path: "/AddressEditor",
    name: "AddressEditor",
    component: () => import("../views/AddressEditor")
  },
  //---------------------------------------------------------->
  //父子路由--------------------------------------------------->
  //首页商城
  {
    path: "/Home",
    // name: ShoppingMall,
    component: () => import("../views/frame"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/HomePageFramework/Home")
      }
    ]
  },
  //分类
  {
    path: "/classification",
    component: () => import("../views/frame"),
    children: [
      {
        path: "",
        name: "classification",
        component: () => import("../views/HomePageFramework/classification")
      }
    ]
  },
  //购物车
  {
    path: "/ShoppingCart",
    component: () => import("../views/frame"),
    children: [
      {
        path: "",
        component: () => import("../views/HomePageFramework/ShoppingCart")
      }
    ]
  },
  //我的
  {
    path: "/my",
    component: () => import("../views/frame"),
    children: [
      {
        path: "",
        name: "my",
        component: () => import("../views/HomePageFramework/my")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
