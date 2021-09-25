<template>
  <v-card
      color="blue-grey darken-1"
      dark
      :loading="isUpdating"
      width="600"
  >
    <failDialogs ref="failDialogs"></failDialogs>

    <template v-slot:progress>
      <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
      ></v-progress-linear>
    </template>
    <v-img
        height="250"
        width="600"
        src="../../assets/dark-beach.jpg"
    >
      <v-row>
        <v-col
            class="text-right"
            cols="12"
        >
          <v-menu
              bottom
              left
              transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <upDatePaw :username="items.username"></upDatePaw>
              <upDateImage :username="items.username"></upDateImage>
              <v-list-item @click="logOut()">
                <v-list-item-action>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>退出登录</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-row
            class="pa-4"
            align="center"
            justify="center"
        >
          <v-col class="text-center">
            <h3 class="headline">
              {{ items.roomName }}
            </h3>
            <span class="grey--text text--lighten-1">账号：{{ items.username }}</span><br>
            <span class="grey--text text--lighten-1">描述：{{ items.remark }}</span><br>
            <span class="grey--text text--lighten-1">账户类型：{{ items.type }}</span>


          </v-col>
        </v-row>
      </v-row>
    </v-img>
    <!--    <v-form>-->
    <!--      <v-container>-->
    <!--        <v-row>-->
    <!--          <v-col-->
    <!--              cols="12"-->
    <!--              md="12"-->
    <!--          >-->
    <!--            <v-text-field-->
    <!--                v-model="addItem.roomName"-->
    <!--                :disabled="isUpdating"-->
    <!--                filled-->
    <!--                color="blue-grey lighten-2"-->
    <!--                label="昵称"-->
    <!--            ></v-text-field>-->
    <!--          </v-col>-->


    <!--        </v-row>-->
    <!--        <v-row>-->
    <!--          <v-col-->
    <!--              cols="12"-->
    <!--              md="12"-->
    <!--          >-->
    <!--            <v-text-field-->
    <!--                v-model="addItem.remark"-->
    <!--                :disabled="isUpdating"-->
    <!--                filled-->
    <!--                color="blue-grey lighten-2"-->
    <!--                label="描述"-->
    <!--            ></v-text-field>-->
    <!--          </v-col>-->

    <!--        </v-row>-->
    <!--      </v-container>-->
    <!--    </v-form>-->
    <v-divider></v-divider>
    <!--    <v-card-actions>-->

    <!--      <v-btn-->
    <!--          :loading="isUpdating"-->
    <!--          color="blue-grey darken-3"-->
    <!--          depressed-->
    <!--          @click="save()"-->
    <!--      >-->
    <!--        <v-icon left>-->
    <!--          mdi-update-->
    <!--        </v-icon>-->
    <!--        保存-->
    <!--      </v-btn>-->
    <!--    </v-card-actions>-->
  </v-card>
</template>

<script>
import upDatePaw from "./upDatePaw";
import {getAdminInfo, updateAdminInfoFromApi} from "../../network/adminApi";
import failDialogs from "../HomeItem/failDialogs";
import $store from '../../store'
import upDateImage from "./upDateImage";
import {ifthen} from "../../network/FN";

export default {
  data() {
    return {
      isUpdating: false,
      items: {
        roomName: '信息与智慧交通学院',
        username: '',
        remark: 'aaaa',
        type: 1,

      },
      addItem: {},
    }
  },


  methods: {
    logOut() {
      this.$store.commit('upDataSing')
      this.$router.push('/')
    },

    // save(){
    //   this.isUpdating = true
    //
    //   updateAdminInfoFromApi(this.addItem)
    //   .then((res)=>{
    //     if(ifthen(res)) {
    //       this.isUpdating = false
    //       this.items = this.addItem
    //       $store.commit('upDateAdminInfo', this.addItem)
    //       this.$refs.failDialogs.dialog=true
    //       this.$refs.failDialogs.text='修改信息成功'
    //     }
    //   })
    //   .catch(()=>{
    //     this.$refs.failDialogs.dialog=true
    //     this.$refs.failDialogs.text='修改信息失败请重新尝试或检查网络连接'
    //   })
    //
    // }

  },

  created() {
    getAdminInfo()
        .then(res => {
          if (ifthen(res)) {
            this.items.roomName = res.data.roomName
            this.items.username = res.data.username
            this.items.remark = res.data.remark
            this.items.type = res.data.type
            this.addItem = this.items
          }
        })
        .catch(() => {
          this.$refs.failDialogs.dialog = true
          this.$refs.failDialogs.text = '获取信息失败请重新尝试或检查网络连接'
        })
    // this.items=this.$store.state.adminInfo
    //this.addItem=this.$store.state.adminInfo
  },

  components: {
    upDatePaw,
    failDialogs,
    upDateImage

  }
}
</script>
<style scoped>
</style>