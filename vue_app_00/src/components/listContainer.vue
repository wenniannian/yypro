<!-- listContainer -->
<template>
    <div class="app-container">
        <h1>数据列表：</h1>
        <ul>
            <!-- :key="" v-for循环对数据排序，key条件 -->
            <!-- :key条件，不重复 -->
            <!-- 添加key提升排序效率 -->
            <li v-for="item in list" :key="item.uid">
                编号：{{item.uid}}<br>
                姓名：{{item.uname}}<br>
                性别：{{item.sex}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){ 
            return {
                list:[
                    { uid:1,uname:"思聪",sex:"男"},
                    { uid:2,uname:"老易",sex:"男"},
                    { uid:3,uname:"老梅",sex:"男"},
                    { uid:4,uname:"大哥",sex:"女"},
                ]
            } 
        }
    }
</script>
<!-- scoped：私有组件 -->
<style scoped>
    .app-container ul{
        padding-left:0;
    }
    .app-container ul li{
        list-style: none;
        border: 1px solid #333;
        color:#666;
        padding:10px;
    }
    .app-container ul li:nth-child(2n){
        background: linear-gradient(to left,#ffaaff 0%,#aaafff 100%)
    }
</style>