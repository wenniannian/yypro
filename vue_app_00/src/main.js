import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 
// Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
// Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

// 0.1、引入Vuex
import Vuex from 'vuex'
// 0.2、注册Vuex组件
Vue.use(Vuex)
// 0.3、创建Vuex实例对象
var store = new Vuex.Store({
  // 状态
  state:{
    cartCount:0, //购物车中商品数量
  },
  // 修改共享数据方法
  mutations:{
    increment(state,count){ state.cartCount+=count },//增加
    substract(state){ state.cartCount-- },//修改
    clear(state){ state.cartCount = 0 },  //清空
  },
  // 获取
  getters:{
    optCartCount:function(state){
      return state.cartCount;
    }
  }
})
// 0.4、将Vuex对象注册Vue对象
// 页面最后的new Vue

//1、引入mint-ui Header组件
import {Header,Swipe,SwipeItem,Button} from "mint-ui"
//2、注册Header组件
Vue.component(Header.name,Header); //"mt-header" 等同于 Header.name
//3、注册Swipe、SwipeItem组件
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);//button按钮

// 3.1 引入axios库（VueResource）
import axios from "axios"
// 3.2 跨域保存session值；配置属性
axios.defaults.withCredentials=true;// 每次都带着session，发送session编号，保持连接
// 3.3注册组件
Vue.prototype.axios=axios;

//4、引入vue-resource库
import VueResource from "vue-resource";
//5、注册vue-resource库
Vue.use(VueResource)
//6、配置vue-resource常见属性
  //6.1、设置请求服务器根目录
  Vue.http.options.root = "http://127.0.0.1:3000/";
  //6.2、全局设置post时候表单// application/x-www-form-urlencoded
  //将提交数据进行转码操作
  Vue.http.options.emulateJSON = true;
  // 6.3、跨域访问保存session值选项
  Vue.http.options.withCredentails = true;

//7、创建日期类型过滤器
// val：原先日期对象
Vue.filter("datatimeFilter",function(val){
  //7.1、创建日期对象
  var data =new Date(val); //日期格式转对象
  //7.2、获取年月日时分秒
  var Y=data.getFullYear();
  var M=data.getMonth()+1;// 月份0~11
  var D=data.getDate();
  var h=data.getHours();
  var m=data.getMinutes();
  var s=data.getSeconds();
  //7.3、格式判断 07 08 09 10
  M<10&&(M="0"+M); // 等于 if判断（逻辑短路）
  D<10&&(D="0"+D);
  //7.4、拼接字符串返回
  return `${Y}年${M}月${D}日 ${h}:${m}:${s}`;
})

new Vue({
  router,//注册路由
  render: h => h(App),//注册渲染h，
  store               //将Vuex对象注册到Vue实例中
}).$mount('#app')