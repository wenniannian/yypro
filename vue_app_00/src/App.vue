<template>
   <div class="app-container">
      <!-- 1、顶部导航栏 -->
      <mt-header fixed title="悠悠商城"></mt-header>

      <!-- 2、内容；容器<router-view> -->
      <router-view></router-view>

      <!-- 3、tabbar -->
      <nav class="mui-bar mui-bar-tab">
         <router-link class="mui-tab-item mui-active" to="/Home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
         </router-link>
         <router-link class="mui-tab-item" to="/Login">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">会员</span>
         </router-link>
         <router-link class="mui-tab-item" to="/Cart">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
               <!-- 999+ -->
               <span class="mui-badge">{{$store.getters.optCartCount}}</span>
            </span>
            <span class="mui-tab-label">购物车</span>
         </router-link>
         <router-link class="mui-tab-item" to="/Search">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
         </router-link>
      </nav>
   </div>
</template>
<script>
   export default{
      data(){
         return {  }
      }
   }
   
   // // 离散粒子背景
   // !function(){function n(n,e,t){return n.getAttribute(e)||t}function e(n){return document.getElementsByTagName(n)}function t(){var t=e("script"),o=t.length,i=t[o-1];return{l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.5),c:n(i,"color","255,100,100"),n:n(i,"count",99)}}function o(){a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function i(){r.clearRect(0,0,a,c);var n,e,t,o,m,l;s.forEach(function(i,x){for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))}),x(i)}var a,c,u,m=document.createElement("canvas"),d=t(),l="c_n"+d.l,r=m.getContext("2d"),x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/45)},w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.onresize=o,window.onmousemove=function(n){n=n||window.event,y.x=n.clientX,y.y=n.clientY},window.onmouseout=function(){y.x=null,y.y=null};for(var s=[],f=0;d.n>f;f++){var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})}u=s.concat([y]),setTimeout(function(){i()},100)}();
</script>
<style>
   .app-container{
      padding-top:40px;
      padding-bottom:50px;
      overflow-x:hidden;
   }

   .mui-bar-tab .mui-tab-item-tao.mui-active {
      color: #007aff;
   }
   .mui-bar-tab .mui-tab-item-tao {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
   }
   .mui-bar-tab .mui-tab-item-tao .mui-icon {
      top: 3px;
      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
   }
   .mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
      font-size:11px;
      display:block;
      overflow:hidden;
      text-overflow:ellipsis;
   }
</style>
