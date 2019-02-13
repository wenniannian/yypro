<template>
    <div class="app-home">
        <!-- 2、轮播图 使用子组件 -->
        <swipe-box :list="list"></swipe-box>

        <!-- 3、九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/NewsList">
                    <img src="../../img/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/Goodslist">
                    <img src="../../img/menu2.png" alt="">
                    <div class="mui-media-body">商品</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/waimai">
                    <img src="../../img/menu3.png" alt="">
                    <div class="mui-media-body">点餐</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/Location">
                    <img src="../../img/menu4.png" alt="">
                    <div class="mui-media-body">location</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/Search">
                    <img src="../../img/menu5.png" alt="">
                    <div class="mui-media-body">Search</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/Phone">
                    <img src="../../img/menu6.png" alt="">
                    <div class="mui-media-body">Phone</div>
                </router-link>
            </li>
        </ul> 
    </div>
</template>

<script>
    // 引入轮播图
    import swipe from "../sub/Swipe.vue";
    export default{
        data(){
          return {
              list:[]
          }  
        },
        created() {
            // console.log(this.$route.params.id);
            this.getImages();
        },
        components:{
            // 2、注册子组件
            "swipe-box":swipe
        },
        methods:{
            getImages(){
                var url = "http://127.0.0.1:3000/imagelist"
                this.axios.get(url).then(res=>{
                    this.list = res.data;
                })
            }
        }
    }
</script>

<style scoped>
    /* 九宫格图片大小 */
    .app-home .mui-table-view.mui-grid-9{
        background-color: #fff;
    }
    .app-home .mui-table-view.mui-grid-9 li{
        border: none;
    }
    .app-home .mui-table-view.mui-grid-9 img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
</style>