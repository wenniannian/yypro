<template>
    <div class="app-search">
        <div class="mui-card">
            <div class="mui-card-header">
                <input type="text" name="keyword" value="" v-model="keyword" placeholder="请输入关键字">
            </div>
            <div class="mui-card-header">
                <input type="number" name="low" v-model="low" placeholder="请输入价格下限">
            </div>
            <div class="mui-card-header">
                <input type="number" name="high" v-model="high" placeholder="请输入价格上限">
            </div>
            <!-- 搜索 -->
            <div class="mui-card-header">
                <mt-button type="primary" size="large" @click="handkeSearch">搜索</mt-button>
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media"  v-for="item in list" :key="item.lid">
                            <a href="javascript:;">
                                <img class="mui-media-object mui-pull-left" src="" alt="">
                                <div class="mui-media-body">
                                    商品名：{{item.lname}}
                                </div>
                                <p>价格：￥{{item.price.toFixed(2)}}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="mui-card-footer">页脚</div> -->
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default{
        data(){
            return{
                keyword:"",
                low:"",
                high:"",
                list:[]
            }
        },
        methods:{
            handkeSearch(){
                // 1、获取三个参数
                var keyword = this.keyword;// 2、关键词
                var low = this.low;// 3、下限 0
                var high = this.high;// 4、上限 2100000000
                if(low == ""){
                    low = 0;
                }
                if(high == ""){
                    high = 210000000;
                }
                // 5、发送ajax
                var url = "http://127.0.0.1:3000/search?keyword="+keyword+"&low="+low+"&high="+high;
                this.axios.get(url).then(res=>{
                    if(res.data.code == 1){
                        this.list = res.data.data;
                    }else{
                        Toast("没有找到您需要的【"+this.keyword+"】")
                    }
                    console.log(res.data.data);
                })
            }
        },
    }
</script>
<style scoped>
</style>