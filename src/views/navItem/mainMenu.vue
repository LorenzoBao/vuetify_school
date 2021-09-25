<template>
  <v-list>
    <v-subheader>主菜单</v-subheader>

    <navItem :navItemData="Dashboard"></navItem>

    <listItem :listData="absence"></listItem>
    <listItem :listData="college"></listItem>
    <!--    <listItem :listData="Class"></listItem>-->
    <v-divider></v-divider>
  </v-list>
</template>

<script>
import listItem from "../../components/navItem/listItem";
import navItem from "../../components/navItem/navItem";

export default {
  name: "navigation",
  data() {
    return {
      absence: {
        data: [
          ['缺勤记录', 'mdi-account-multiple-outline', '/absence'],

        ],
        title: '缺勤',
        icon: 'mdi-home'
      },

      college: {
        data: [
          ['学院管理', 'mdi-account-multiple-outline', '/college'],

        ],
        title: '学院',
        icon: 'mdi-home'
      },

      // Class:{
      //   data: [
      //     ['班级管理', 'mdi-cog-outline','/ClassCr'],
      //
      //   ],
      //   title:'班级',
      //   icon:'mdi-home'
      // },

      Dashboard: {
        to: '/Dashboard',
        title: '首页',
        icon: 'mdi-home'
      }

    }
  },
  components: {
    listItem,
    navItem
  }

}
</script>

<style scoped>

</style>