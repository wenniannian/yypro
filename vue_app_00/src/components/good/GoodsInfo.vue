<template>
    <div class="app-goodsinfo">
        <!-- 轮播图卡片 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    轮播图子组件
                    <swipe-box :list="list"></swipe-box>
                </div>
            </div>
        </div>
        <!-- 商品信息 -->
        <div class="mui-card">
            <div class="mui-card-header">
                商品名称
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥2999.00</del>
                        销售价：<span class="now">￥2111.00</span>
                    </p>
                    购买数量：
                    <div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
                        <input class="mui-input-numbox" type="number" v-model="val"/>
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
                    </div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
                <mt-button type="primary" size="small">&nbsp;立即购买&nbsp;</mt-button>
            </div>
        </div>
        <!-- 商品参数 -->
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    // 引入轮播图
    import swipe from "../sub/Swipe.vue";
    //引入mui.js
    // 禁止脚手架使用严格模式 npm i 
    // import mui from "../../lib/mui/js/mui.js";
    export default{
        data(){
          return {
                nid:this.$route.params.id,// 从路径里获取参数id
                list:[],
                val:1,
          }  
        },
        // 2、注册轮播图子组件
        created() {
            // console.log(this.$route.params.id);
            this.getImages();
        },
        components:{
            // 2、注册子组件
            "swipe-box":swipe
        },
        methods:{
            // 获取轮播图
            getImages(){
                var url = "http://127.0.0.1:3000/imagelist"
                this.axios.get(url).then(res=>{
                    this.list = res.data;
                })
            },
            // 减少
            goodSub(){
                if(this.val > 1){
                    this.val--;
                }
            },
            // 增加
            goodAdd(){
                if(this.val < 999){
                    this.val++;
                }
            },
            // 添加到购物车
            addCart(){
                // 1、获取参数 pid count uid
                var pid = this.$route.params.id;//当前页面地址栏获取到的id
                var count = this.val;
                var uid = 3; //先设置登录编号为3
                // 2、发送请求
                var url = "http://127.0.0.1:3000/addCart?pid="+pid+"&count="+count+"&uid="+uid;
                this.axios.get(url).then(res=>{
                    console.log(res);
                    if(res.data.code == 1){
                        // 修改全局共享数据 cartCount
                        this.$store.commit("increment",count);//调用increment方法
                        Toast("购物车添加成功");
                    }else{
                        Toast("购物车添加失败");
                    }
                });
                // 3、如果请示成功提示
            },
        }
    }
</script>
<style scoped>
</style>