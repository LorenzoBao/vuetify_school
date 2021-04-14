<template>
  <v-list>
    <v-subheader>管理</v-subheader>
    <listItem :listData="account"></listItem>
    <navItem :navItemData="vacation"></navItem>
    <v-divider ></v-divider>
  </v-list>
</template>

<script>
import listItem from "@/views/listItem";
import navItem from "@/views/navItem";
export default {
name: "Administration",
  data(){
  return{
    account:{
      data: [
        ['收费', 'mdi-account-multiple-outline','/Dashboard'],
        ['费用', 'mdi-account-multiple-outline','/Dashboard'],
        ['工资', 'mdi-cog-outline','/Dashboard'],
      ],
      title:'账目',
      icon:'mdi-home'
    },
    vacation:{
      to:"/vacation",
      icon:"mdi-cog-outline",
      title:"假期"
    },

  }
  },
  components:{
    listItem,
    navItem
  }

}
</script>

<style scoped>

</style>