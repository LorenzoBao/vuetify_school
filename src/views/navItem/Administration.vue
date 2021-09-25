<template>
  <v-list v-if="isSuperAdmin">
    <v-subheader>管理</v-subheader>
    <navItem :navItemData="superadmin"></navItem>
    <v-divider></v-divider>
  </v-list>
</template>

<script>
import listItem from "../../components/navItem/listItem";
import navItem from "../../components/navItem/navItem";
import {getAdminInfo} from "../../network/adminApi";

export default {
  name: "Administration",
  data() {
    return {
      isSuperAdmin: false,
      superadmin: {
        to: "/superAdmin",
        icon: "mdi-cog-outline",
        title: "超级管理员"
      },


    }
  },

  components: {
    listItem,
    navItem
  },
  created: function () {
    getAdminInfo()
        .then(res => {
          res.data.type === 1 ? this.isSuperAdmin = true : this.isSuperAdmin = false
        })
        .catch()
  }

}
</script>

<style scoped>

</style>