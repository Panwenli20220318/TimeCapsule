import Vue from 'vue'
//安装引入vue-router插件
import VueRouter from "vue-router"
Vue.use(VueRouter);

import app from './App.vue'
import timeCapsule from './view/TimeCapsule.vue'
import funCapsule from "./view/FunCapsule.vue"
import putCapsule from './view/Nesting/PutCapsule.vue'
import openCapsule from './view/Nesting/OpenCapsule.vue'


Vue.config.productionTip = false

//定义路由列表routes
const routes=[
{
  path:'/timeCapsule',
  component:timeCapsule
},
  //重新定向   
{
  path:'/',
  redirect:'/timeCapsule'
},
{
  path:'/funCapsule',
  component:funCapsule,
  children: [   //路由嵌套 
    { path: '', component: putCapsule }, // 默认子路由
    { path: 'tab1', component: putCapsule },
    { path: 'tab2', component: openCapsule }
  ]
}
]

//创建router实例，然后传routes配置
const router = new VueRouter({
  routes,
  mode:'history'
});

new Vue({
  el:"#app",
  router,
  render: h => h(app),
})
