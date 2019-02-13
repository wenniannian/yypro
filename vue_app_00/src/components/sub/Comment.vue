<template>
    <div class="app-comment">
        <!-- <h1>发表评论：{{id}}</h1> -->
        <!-- 发表评论区 -->
        <textarea placeholder="请吐槽最多120个字" maxlength="120" v-model="msg"></textarea>
        <mt-button size="large" @click="postComment">发表评论</mt-button>
        <!-- 显示评论区 -->
        <div class="cmt-list">
            <div class="cmt-item">
                <!-- 3、在模板中创建循环显示当前评论列表 -->
                <!-- 4、楼层1 2 3 4 -->
                <!-- 5、在模板中添加 “加载更多”按钮 -->
                <!-- 6、点击事件 -->
                <div class="cmt-info" v-for="(item,i) of list" :key="item.id">
                    <b>
                        第 <font color="gray">{{i+1}}</font> 楼
                        用户名:<font color="gray">{{item.user_name}}</font>
                        发表时间:<font color="gray">{{item.ctime | datatimeFilter}}</font>
                    </b>
                    <div class="cmt-body">
                        <font color="#333">{{item.content}}</font>
                    </div>
                </div>
                <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    // 单独的引入mint-ui 组件Toast
    // 其他组件不用
    import {Toast} from 'mint-ui';
    export default{
        // 模型变量
        data(){
            return {
                list:[], //数据
                pno:0, //当前页码
                pageSize:2, //每页显示个数
                pageCount:1, //总页数
                msg:"", //评论内容双向绑定
            }
        },
        // 生命周期
        created() {
            this.getMore();
        },
        // 方法函数
        methods:{
            // 发表评论
            postComment(){
                // 1、获取用户输入内容，新闻编号，用户名
                var msg = this.msg;//评论内容
                var nid = this.id;//父元素 传递新闻编号
                // var user_name = "匿名";//用户名
                // 2、判断如果评论内容为空
                var size = msg.trim().length;//内容两端为空
                // 3、提示评论内容不能为空
                if(size==0){
                    Toast("评论内容不能为空");// 评论内容为空，不发请求
                    return;//停止函数执行
                }
                // VueResource方法 $http
                // // 4、发送post请求
                // var url = "addComment";
                // var obj = {nid:nid,user_name:user_name,content:msg}
                // this.$http.post(url,obj).then(res=>{
                //     // 5、成功提示评论发表成功
                //     var obj = res.body
                //     // 6、提示发表成功
                //     if(obj.code ==1 ){
                //         Toast(obj.msg);
                //         // 7、显示最新一页数据
                //         var pno = 0;//pageCount/pageSize;//总页数/每页个数（）
                //         var data = [];
                //         // 8、重新调用
                //         // this.getMore();
                //     }else{
                //         Toast("评论发表失败")
                //     }
                // }) 
                
                // axios 
                var url = "http://127.0.0.1:3000/addComment";//请求的地址
                var param = `nid=${nid}&content=${msg}`;//请求的参数
                this.axios.post(url,param).then(res=>{
                    console.log(res);
                    if(res.data.code == 1){
                        Toast("评论成功");
                        this.pno = 0;
                        this.list = [];
                        this.getMore();
                    }else{
                        Toast("评论发表失败");
                    }
                });
            },
            // 获取更多评论内容
            getMore(){
                this.pno++;
                // 1、发送请求获取评论列表nid
                var hasMore = this.pno <= this.pageCount;//变量保存是否有当前页（pno当前页 <= pageCount总页数）
                if(!hasMore){ 
                    Toast("已无更多内容");
                    return ;
                };//如果没有页数，停止当前函数执行，return
                
                var url = "getcomment?nid="+this.id+"&pno="+this.pno+"&pageSize="+this.pageSize;
                this.$http.get(url).then(res=>{
                    // 2、追加list
                    //加载更多//concat 拼接数组
                    var rows = this.list.concat(res.body.data);
                    this.list = rows;
                    //保留总页数
                    this.pageCount = res.body.pageCount;
                    // console.log(res.body.data);
                })
            }
        },
        props:["id"]
    }
</script>
<style scoped>
    .app-comment h3{
        font-size: 18px;/*标题*/
    }
    .app-comment textarea{/*评论组件多行文本框*/
        font-size: 14px;/*字体小一些*/
        height: 68px;/*高度*/
        margin: 0;
    }
    .app-comment .cmt-list{/*显示评论列表*/
        margin: 5px 0;
        font-size: 0.8rem;
    }
    .app-comment .cmt-list .cmt-item{
        border:1px solid #aaa;/*评论项*/
        margin-top: 10px;
    }
    .app-comment .cmt-list .cmt-info{
        line-height: 20px;/*评论内容*/
        background: #ccc;
        margin-bottom: 5px
    }
</style>