import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/components/home/MainMenu/Dashboard";
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Dashboard
  },
  {
    path:'/stuNameList',
    component:() => import('@/components/home/MainMenu/stu/stuNameList')
  },
  {
    path:'/Dashboard',
    component:Dashboard
  },
  {
    path:'/stuInformation',
    component:() => import('@/components/home/MainMenu/stu/stuInformation')
  },
  {
    path:'/stuAdd',
    component:() => import('@/components/home/MainMenu/stu/stuAdd')
  },
  {
    path:'/stuModify',
    component:() => import('@/components/home/MainMenu/stu/stuModify')
  },
  {
    path:'/teachModify',
    component: () => import('@/components/home/MainMenu/teach/teachModify')
  },
  {
    path:'/teachAdd',
    component:() => import('@/components/home/MainMenu/teach/teachAdd')
  },
  {
    path:'/teachInformation',
    component:() => import('@/components/home/MainMenu/teach/teachInformation')
  },
  {
    path:'/teachNameList',
    component:() => import('@/components/home/MainMenu/teach/teachNameList')
  },
  {
    path:'/vacation',
    component:() => import('@/components/home/admin/vacation')
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
