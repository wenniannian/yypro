<template>
    <div class="app-goodslist">
        <!-- 商品列表 -->
        <div class="goods-item" v-for="item in list" :key="item.id">
            <!-- 
                <img src="..."  
                    方法一→ @click="jumpDetail(item.id)"  
                    方法二→ :data-id="item.id"  扩展属性,适用于小程序
             -->
            <img :src="item.img_url" @click="jumpDetail" :data-id="item.id"/>
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <div class="price">
                    <!-- 原价：<span class="old">￥{{item.price.toFixed(2)}}</span><br>
                    现价：<span class="now">￥{{(item.price-200).toFixed(2)}}</span> -->
                    原价：<span class="old">￥{{item.old.toFixed(2)}}</span><br>
                    现价：<span class="now">￥{{item.now.toFixed(2)}}</span>
                </div>
            </div>
            <div class="sell">
                <span>热卖中</span>
                <span>剩 <font color="red">99</font> 件</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                list:[],
             }
       },
       methods:{
            // 获取商品列表
            getShop(){
                this.$http.get("goodslist").then(res=>{
                    this.list = res.body;
                    // console.log(res.body);
                })
            },
            // 跳转到商品详情
            jumpDetail(even){
                // 获取商品编号
                var id = even.target.dataset.id;
                // console.log(even.target.dataset.id);
                // 跳转不同组件
                this.$router.push("/GoodsInfo/"+id);
            }
       },
       created() {
           this.getShop();
       },
    }
</script>
<style scoped>
    .app-goodslist{
        display: flex;                  /*最外层设置弹性布局*/
        flex-wrap: wrap;                /*子元素换行*/
        justify-content: space-between; /*两端对齐*/
        padding: 7px;
    }
    .app-goodslist .goods-item{
        width: 49%;                 /*元素宽度*/
        border: 1px solid #ccc;   /*边框*/
        box-shadow: 0 0 8px #ccc; /*阴影*/
        margin: 4px 0;
        padding: 2px;
        display: flex;              /*弹性布局*/
        flex-direction: column;     /*排列方式：垂直*/
        min-height:210px;           /*最小高度*/
        /* justify-content: space-between; /*子元素两端对齐 */
    }
    .app-goodslist .goods-item h3{
        font-size: 18px;
    }
    .app-goodslist .goods-item img{
        width: 100%;
    }
    /* 商品价格 */
    /* 原价 */
    .old{
        color: gray;
        font-size: 12px;
        text-decoration:line-through;   /*删除线*/
    }
    /* 现价 */
    .now{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
    /* 热卖 */
    .sell{
        display: flex;
        justify-content: space-between; /*两端子元素对齐*/
    }
</style>