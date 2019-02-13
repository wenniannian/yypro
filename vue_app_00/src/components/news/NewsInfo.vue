<template>
    <div class="app-newsinfo">
        <h3>{{info.title}}</h3>
        <textarea cols="30" rows="8" readonly>{{info.content}}</textarea>
        <div class="my-div">
            <h3>{{info.ctime | datatimeFilter}}</h3>
            <h3>点击 {{info.point}} 次</h3>
        </div>
        <!-- 新闻评论子组件 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>
<script>
    // 1、引入子组件
    import Comment from "../sub/Comment.vue"
    export default{
        created() {
            this.getNewsInfo();
        },
        data(){
            return { 
                id:this.$route.query.id,//当前页的id
                info:{},
            }
        },
        methods:{
            getNewsInfo(){
                // 获取到的参数id
                var id = this.$route.query.id;
                this.$http.get("newsinfo?id="+id).then(res=>{
                    this.info = res.body.data[0];
                })
            }
        },
        components:{
            // 2、注册子组件
            "comment-box":Comment
        }
    }
</script>
<style scoped>
    textarea{
        margin-bottom: 0;
    }
    .app-newsinfo>.my-div{
        display: flex;
        justify-content: space-between;
    }
    .app-newsinfo>.my-div>h3{
        font-size: 0.8rem;
        color: gray;
        margin: 5px;
    }
</style>