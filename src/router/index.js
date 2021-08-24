import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/home/MainMenu/Dashboard";
import Sign from "../views/Sign";
import Home from "../Home";
import $store from '../store'
import {getAdminInfo} from "../network/adminApi";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component:Sign,
    name:'Login'
  },


  {
    path: '/Home',
    component: Home,
    children: [
      {
        path:'/Dashboard',
        component:Dashboard
      },

      {
        path:'/college',
        component:() => import('../views/home/MainMenu/college/college')
      },
      {
        path:'/absence',
        component:() => import('../views/home/MainMenu/absence/absence')
      },
      {
        path:'/ClassCr/:pid',
        component:() => import('../views/home/MainMenu/ClassCr/ClassCr')
      },

      {
        path:'/superAdmin',
        component:() => import('../views/home/admin/superAdmin')
      },

    ]
  },




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//      if ($store.state.isSing) {
//        if (to.path === '/superAdmin') {
//          getAdminInfo()
//              .then(res => {
//                if( res.data.type === 1){
//                  next()
//                }else{
//                  next('/')
//                }
//              })
//              .catch(err=>{
//                next('/')
//              })
//        }
//        } else {
//          if (to.path === '/') {
//             next()
//            } else {
//              next('/')
//            }
//
//       }
//   })



export default router
