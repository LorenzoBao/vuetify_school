<template>
  <v-list>
    <v-subheader>主菜单</v-subheader>

    <navItem :navItemData="Dashboard"></navItem>

    <listItem :listData="stu"></listItem>
    <listItem :listData="teach"></listItem>
    <listItem :listData="subject"></listItem>
    <v-divider ></v-divider>
  </v-list>
</template>

<script>
import listItem from "@/views/listItem";
import navItem from "@/views/navItem";
export default {
name: "navigation",
  data(){
    return{
      stu:{
        data: [
          ['学生名单', 'mdi-account-multiple-outline','/stuNameList'],
          ['学生信息', 'mdi-cog-outline','/stuInformation'],
          ['添加学生', 'mdi-account-multiple-outline','/stuAdd'],
          ['修改学生', 'mdi-cog-outline','/stuModify'],
        ],
        title:'学生',
        icon:'mdi-home'
      },

      teach:{
        data: [
          ['老师名单', 'mdi-account-multiple-outline','/teachNameList'],
          ['老师信息', 'mdi-cog-outline','/teachInformation'],
          ['添加老师', 'mdi-account-multiple-outline','/teachAdd'],
          ['修改老师', 'mdi-cog-outline','/teachModify'],
        ],
        title:'老师',
        icon:'mdi-home'
      },

      subject:{
        data: [
          ['学科名单', 'mdi-account-multiple-outline','/Dashboard'],
          ['添加学科', 'mdi-account-multiple-outline','/Dashboard'],
          ['修改学科', 'mdi-cog-outline','/Dashboard'],
        ],
        title:'学科',
        icon:'mdi-home'
      },

      Dashboard:{
       to:'/Dashboard',
       title:'仪表盘',
       icon:'mdi-home'
      }

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