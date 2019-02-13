<template>
    <div class="app-swipe">
        <!-- 2、轮播图 -->
        <!-- 在data创建四个图片组件 id img_url，创建循环显示所有内容 -->
        <mt-swipe :auto="3000" :show-indicators="true">
            <mt-swipe-item v-for="item of list" :key="item.id">
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default{
        data(){ 
            return { };
        },
        props:["list"], //接收父组件数据
    }
</script>
<style>
    /* 轮播图 */
    .mint-swipe{ height: 200px !important;}
    .mint-swipe img{ width:100% !important; }
</style>