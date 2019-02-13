<template>
    <div class="app-login">
        <!-- 练习一、创建mui卡片组件 -->
        <div class="mui-card">
            <div class="mui-card-header">用户登录</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                     <!-- 练习二、添加用户名密码提交按钮 -->
                    <form action="#">
                        用户名：<input type="text" value="" placeholder="请输入用户名..." v-model="uname" maxlength="12">
                        密码：<input type="password" value="" placeholder="请输入密码..." v-model="upwd" maxlength="12">
                        <div class="my-span">
                            <span><input type="checkbox">自动登录</span>
                            <span><router-link to="/Forget_password ">忘记密码？</router-link></span>
                        </div>
                         <!-- 练习三、为提交按钮绑定点击事件 
                                     获取用户名和密码验证
                                     ajax -->
                        <mt-button size="large" @click="handleLogin">登录</mt-button>
                    </form>
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default{
        data(){
            return {
                uname:"",
                upwd:"",
            }
        },
        methods:{
            handleLogin(){
                // VueResource 方法
                // 1、获取参数
                var uname = this.uname;
                var upwd = this.upwd;
                // 2、正则表达式验证
                // 3、发送请求
                // var url = "login?uname="+uname+"&upwd="+upwd;
                // this.$http.get(url).then(res=>{
                //     var  obj = res.body;
                //     if(obj.code == -1){
                //         Toast(obj.msg);//登录失败提示
                //     }else{
                //         this.$router.push("/Home");
                //     }
                // })

                //换一种方式发请求，兼容性好一些axios
                var url = "http://127.0.0.1:3000/login?uname="+uname+"&upwd="+upwd;
                this.axios.get(url).then(res=>{
                    console.log(res.data)
                    if(res.data.code == -1){
                        Toast(res.data.msg);//登录失败提示
                    }else{
                        // 成功以后跳转
                        this.$router.push("/Home");
                    }
                })
            }
        },
        // 监听 双向绑定 v-model
        // watch:{
        //     uname(){ console.log(this.uname); },
        //     upwd(){ console.log(this.upwd); }
        // }
    }
</script>
<style scoped>
    .my-span{
        display: flex;
        justify-content: space-between
    }
</style>