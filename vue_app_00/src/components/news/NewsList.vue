<template>
    <div class="app-newlist">
        <!-- 新闻 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for=" item in list" :key="item.id">
                <!-- router-link 跳转到详情页面 -->
                <router-link :to="'/NewsInfo?id='+item.id">
                    <!-- 图片 -->
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>{{item.ctime | datatimeFilter}}</span>
                            <span @cilck="getPoint(+1)">点击: {{item.point}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button type="primary" size="large" @click="getMore" class="my-jiazai">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default{
        // 模型变量
        data(){ 
            return {
                list:[],// 新闻数据
                pno:0,// 当前页码
                pageSize:7,// 每页个数
                pageCount:1,// 总页码
            }
        },
        // 方法、函数
        methods:{
            getMore() {
                // 当前页码+1
                this.pno++;
                //变量保存是否有当前页（pno当前页 <= pageCount总页数）
                var hasMore = this.pno <= this.pageCount;
                //如果没有页数，停止当前函数执行，return
                if(!hasMore){
                    Toast("已无更多内容！");
                    return;
                };
                // 1、发送请求，获取分页数据
                var url = "newslist?pno="+this.pno+"&pageSize="+this.pageSize;
                this.$http.get(url).then(
                    result=>{
                        // this.list = result.body.data;// 返回的数组
                        //加载更多//concat 拼接数组
                        var rows = this.list.concat(result.body.data);
                        this.list = rows;
                        //如果当前页是最后一页，不再发送请求
                        //保留总页数
                        this.pageCount = result.body.pageCount;
                    }
                )
                // 2、并且显示组件模块中
            },
            getPoint(){ }
        },
        // 生命周期
        created() {
            // 组件创建成功后调用
            this.getMore();
        },
    }
</script>
<style scoped>
    .mui-media-body{
        font-size: 1rem;
        color: gray;
    }
    .app-newlist .mui-table-view li .mui-ellipsis{
        font-size: 0.5rem;
        color:#226aff;
        display: flex;
        justify-content: space-between;
        position: relative;
        top:5px;
    }
</style>