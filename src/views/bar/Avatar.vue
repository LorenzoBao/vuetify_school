<template>
  <div class="text-center" id="avatar">
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        offset-y
    >
      <template v-slot:activator="{ on, attrs }">


          <v-avatar
              v-bind="attrs"
              v-on="on"
          >
            <img
                :src="image"
                alt="无图片"
            >
          </v-avatar>
      </template>

      <v-card>

        <updateInfo></updateInfo>


      </v-card>
    </v-menu>
  </div>
</template>

<script>
import updateInfo from "../../components/avatarItem/updateInfo";
import $store from '../../store'
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    image:$store.state.adminImage,
  }),
  components:{
    updateInfo
  }
}
</script>

<style scoped>
#avatar{
position: fixed;
  right: 30px;
}
</style>