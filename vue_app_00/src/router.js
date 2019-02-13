import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
// 1、引入自定义组件
import Test from "./components/Test.vue"
import List from "./components/listContainer.vue"
// 首页
import Home from "./components/tabbar/Home.vue"
// 购物车
import Cart from "./components/tabbar/Cart.vue"
// 搜索
import Search from "./components/tabbar/Search.vue"
// 新闻
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"
// 商品
import GoodsList from "./components/good/GoodsList.vue"
import GoodsInfo from "./components/good/GoodsInfo.vue"
// 登录
import Login from "./components/login/Login.vue"


Vue.use(Router)

export default new Router({
  //2、为组件配置访问路径
  routes: [
    //        redirect:跳转（重定向）
    {path:'/',redirect:"/Home"},
    // 主页
    {path:'/Home',component:Home},//项目首页
    {path:'/Cart',component:Cart},//购物车
    // 新闻
    {path:'/NewsList',component:NewsList},//新闻首页
    {path:'/NewsInfo',component:NewsInfo},//新闻详情
    // 商品
    {path:'/GoodsList',component:GoodsList},//商品首页
    {path:'/GoodsInfo/:id',component:GoodsInfo},//商品详情
    // 登录
    {path:'/Login',component:Login},//登录页面
    // 搜索
    {path:'/Search',component:Search},//搜索页面
    
    // 测试页面
    {path:'/List',component:List},
    {path:'/Test',component:Test},
  ]
})