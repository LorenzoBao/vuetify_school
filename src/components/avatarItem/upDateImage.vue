<template>
  <div class="text-center">

    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
    >

      <template v-slot:activator="{ on, attrs }">


        <v-list-item
            v-bind="attrs"
            v-on="on">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>更改头像</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </template>

      <v-card
          :loading="isUpdating"
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                  :src="image"
                  alt="无图片"

              >
            </v-list-item-avatar>
            <h3>{{username}}</h3>
            <failDialogs ref="failDialogs"></failDialogs>

          </v-list-item>
          <template>
            <v-file-input
                accept="image/*"
                label="点击上传头像"
                v-model="file"
            ></v-file-input>
          </template>

        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text
              @click="menu = false"
          >
            取消
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="submit()"

          >
            确认修改
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import {addImage, getImage} from "../../network/adminApi";
import failDialogs from "../HomeItem/failDialogs";
import $store from '../../store'
import {ifthen} from "../../network/FN";
export default {
  data: () => ({
    image:$store.state.adminImage,
    isUpdating:false,
    menu: false,
    file:''

  }),
  props:{
    username: {
      type:String
    }
  },
  methods:{
    submit(){
      this.isUpdating=true
      addImage(this.file,this.$store.state.adminUserName)
      .then((res)=>{
        if(ifthen(res)) {
          this.$refs.failDialogs.dialog = true;
          this.$refs.failDialogs.text = '修改成功'
          this.menu = false
          this.isUpdating = false
          this.file = ''
          getImage(this.$store.state.adminUserName)
              .then((res) => {
                if(ifthen(res)) {
                  $store.commit('upDateAdminImage', res.data)
                }
              })
        }
          })
          .catch(()=>{
            this.$refs.failDialogs.dialog=true;
            this.$refs.failDialogs.text='修改失败请重新尝试或检查网络连接'
            this.isUpdating=false
          })



    }
  },
  components:{
    failDialogs
  }
}
</script>

<style scoped>

</style>