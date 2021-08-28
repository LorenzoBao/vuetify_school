import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
        adminImage:"https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg",
        adminUserName:'admin',
        isSing:true,//改false
        Sing:true,
        token:VueCookies.get('token')?VueCookies.get('token'):'',
        adminInfo:null
  },
  mutations: {
    getToken(state){
      return  state.token
    },

    upDataSing(state){
      state.Sing=false
    },
    upDateAdminImage(state,image){
      state.adminImage=image
    },
    upDateAdminInfo(state,info){
      state.adminInfo=info
    },
    upDateAdminUserName(state,username){
      state.adminUserName=username
    },
    setToken(state,token){
      if (token){
        VueCookies.set('token','Bearer'+' '+token)
        state.token=VueCookies.get('token')
        console.log( state.token);
      }else {
        state.token=''
      }

    },
    delToken(state){
      state.token=''
      VueCookies.remove('token')
    }
  },
  actions: {
  },
  modules: {

  }
})
