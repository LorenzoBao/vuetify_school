<template>
  <div>
<h2>学生管理</h2>
    <Breadcrumbs :breadcrumbsItemData="Breaditems"></Breadcrumbs>
    <TableStu :pid="pid"></TableStu>
  </div>
</template>

<script>
import Breadcrumbs from "../../../../components/HomeItem/Breadcrumbs";
import TableStu from "../../../../components/HomeItem/TableStu";
export default {
name: "ClassCr",
  data(){
    return{
      pid:this.$route.params.pid,
      Breaditems: [
        {
          text: '首页',
          disabled: false,
          to: '/Dashboard',
        },
        {
          text: '学院管理',
          disabled: false,
          to: '/college',
        },{
          text: '学生管理',
          disabled: true,
          to: '/ClassCr',
        },
      ],
    }
  },
  components:{
    Breadcrumbs,
    TableStu
  },
  created() {

  }
}
</script>

<style scoped>

</style>