<template>
    <div class="app-cart">
        <div class="mui-card">
            <div class="mui-card-header">
                购物车
            </div> 
            <div class="mui-card-content">
                <!-- <div class="mui-card-content-inner" v-for="item in list" :key="item.iid">
                    <p>商品名称：{{item.lname}}</p>
                    <p class="price">市场价：<del>￥{{item.price}}</del></p>
                    <p class="price">销售价：<span class="now">￥{{item.price}}</span></p>
                    <p class="price">数量：
                        <span> 
                            <div class="mui-numbox">
                                <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
                                <input class="mui-input-numbox" type="number" :value="item.count"/>
                                <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
                            </div>
                        </span>
                    </p>
                </div> -->
                
                <!-- 卡片媒体对象 数字按钮 -->
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.iid">
                        <a href="javascript:;">
                            <img class="mui-media-object mui-pull-left" src="">
                            <div class="mui-media-body">
                                {{item.lname}}
                                <p class="mui-ellipsis">
                                    <span class="price">￥{{item.price.toFixed(2)}}</span>
                                    <span class="count">
                                        <div class="mui-numbox">
                                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="cartSub" :data-iid="item.iid">-</button>
                                            <input class="mui-input-numbox" type="number" :value="item.count" />
                                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="cartAdd" :data-iid="item.iid">+</button>
                                        </div>
                                    </span>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="mui-card-footer">
                合计：￥{{getSubTotal}}
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    export default{
        // 模型变量
        data(){
            return { 
                list:[],
            }
        },
        // 生命周期
        created() {
            this.getMore();
        },
        // 方法
        methods:{
            // 获取到商品
            getMore(){
                var uid = 3;
                var url = "http://127.0.0.1:3000/getCarts?uid="+uid;
                this.axios.get(url).then(res=>{
                    this.list = res.data.data;
                })
            },
            // 减少
            cartSub(e){
                //获取到iid
                var iid = e.target.dataset.iid;
                // 修改当前购物车里的数量
                // 1、创建循环list
                for(var item of this.list){
                    // 2、判断当前元素iid是否是iid
                    if(item.iid == iid && item.count > 1){
                        // 3、当前数据减1
                        item.count--;
                        // 5、更新数据库值减1
                        this.updateCart(iid,item.count);
                        // 4、跳出循环
                        break;
                    }
                }
            },
            // 增加
            cartAdd(e){
               //获取到iid
               var iid = e.target.dataset.iid;
                // 修改当前购物车里的数量
                // 1、创建循环list
                for(var item of this.list){
                    // 2、判断当前元素iid是否是iid
                    if(item.iid == iid && item.count < 999){
                        // 3、当前数据减1
                        item.count++;
                        // 5、更新数据库值加1
                        this.updateCart(iid,item.count);
                        // 4、跳出循环
                        break;
                    }
                }
            },
            // 修改数据
            updateCart(iid,count){
                var url = "http://127.0.0.1:3000/updateCart?iid="+iid+"&count="+count;
                this.axios.get(url).then(res=>{
                    if(res.data.code == 1){
                        Toast(res.data.msg);//更新成功
                    }else{
                        Toast(res.data.msg);
                    }
                })
            }
        },
        // 计算属性
        computed:{
            // 每次数据发生改变就执行一次这里的代码
            getSubTotal:function(){ 
                // 计算购物车内所有商品的价格总和
                var sum = 0;
                for(var item of this.list){
                    sum += item.price * item.count;
                }
                return sum;
            }
        },
    }
</script>
<style scoped>

</style>