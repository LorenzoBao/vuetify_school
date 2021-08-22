<template>
  <v-card
      color="blue-grey darken-1"
      dark
      :loading="isUpdating"
      width="400"
      id="card"
  >
    <template v-slot:progress>
      <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
      ></v-progress-linear>
    </template>
    <v-img
        height="300"
        src="../assets/dark-beach.jpg"
    >

    </v-img>
    <v-form>
      <v-container id="text">
        <div style="width: 280px">

            <v-text-field
                v-model="names"
                :disabled="isUpdating"
                class="text"
                filled
                color="blue-grey lighten-2"
                label="用户名"
            ></v-text-field>
        </div>
        <div style="width: 280px">

            <v-text-field
                v-model="pas"
                :disabled="isUpdating"
                filled
                class="text"
                type="password"
                color="blue-grey lighten-2"
                label="密码"
            ></v-text-field>
        </div>
      </v-container>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>

      <v-spacer></v-spacer>
      <v-btn
          :loading="isUpdating"
          color="blue-grey darken-3"
          depressed
          @click="submit()"
      >
        <v-icon left>
          mdi-update
        </v-icon>
        登录
      </v-btn>
    </v-card-actions>
    <failDialogs  ref="failDialogs"></failDialogs>
  </v-card>
</template>

<script>
import {request} from "../network/request";
import VueCookies from 'vue-cookies'
import {getAdminInfo, getImage} from "../network/adminApi";
import $store from '../store'
import {ifthen} from "../network/FN";
import failDialogs from "../components/HomeItem/failDialogs";


export default {
name: "Sign",
  data(){
    return{
      pas: VueCookies.get('password')? VueCookies.get('password'):'',
      names:  VueCookies.get('username')?VueCookies.get('username'):'',
      // password: VueCookies.get('password'),
      // username:VueCookies.get('username'),
      isUpdating: false,
    }
  },
  mounted() {

    if(this.$store.state.Sing && this.names && this.pas){
      setTimeout(()=>{
        this.submit()
      },1000)
  }

  },
  components:{
    failDialogs
  },
  methods:{
  submit(){
    this.$refs.failDialogs.dialog=true;
    this.$refs.failDialogs.text='登录失败，请检查用户名密码或检查网络连接'
    this.isUpdating=true
    request({
      url:'/admin/login',
      method:'post',
      data:{
        "password": this.pas,
        "username": this.names
        // "password": '123456',
        // "username": 'admin'
      },

     //
    })
     .then(res=>{
        if(res.code===500){
          this.isUpdating=false
          alert('登录失败，请检查用户名密码或检查网络连接')

        }
       if(ifthen(res)) {
         this.$store.commit("setToken", res.data.token)
         if (this.$store.state.token) {
           alert('登录成功')
           this.$store.commit('upDataSing')
           VueCookies.set('username', this.names)
           VueCookies.set('password', this.pas)
           getImage(this.names)
               .then((res) => {
                   $store.commit('upDateAdminImage', res.data)
                   $store.commit('upDateAdminUserName', this.names)
                   }
               ).catch()
             getAdminInfo()
                 .then(res=>{
                   if(ifthen(res)) {
                     $store.commit('upDateAdminInfo', res.data)
                     this.$router.push('/Dashboard')
                   }

                 })
                 .catch(()=>{
                   this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='获取个人信息失败请刷新页面'

                 })


         }
       }
      })
      .catch(()=>{

        this.isUpdating=false
        alert('登录失败，请检查网络连接')

      })

   this.$router.push('/Dashboard')



  }
  }
}
</script>

<style scoped>
#card{
  top: 100px;
  margin: auto;
  box-shadow: #c8c9cc 10px 10px 5px;
}
#text{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

</style>