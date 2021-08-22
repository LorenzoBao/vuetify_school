<template>
  <div >
      <h2>缺勤记录操作</h2>
    <Breadcrumbs :breadcrumbsItemData="Breaditems"></Breadcrumbs>
    <TableAbsence></TableAbsence>
  </div>
</template>

<script>
import {request} from "../../../../network/request";
import Breadcrumbs from "../../../../components/HomeItem/Breadcrumbs";
import TableAbsence from "../../../../components/HomeItem/TableAbsence";
export default {
name: "adsence",
  data(){
  return{
    Breaditems: [
      {
        text: '首页',
        disabled: false,
        to: '/Dashboard',
      },
      {
        text: '缺勤记录',
        disabled: true,
        to: '/absence',
      },
    ],
  }
  },
  components:{
    Breadcrumbs,
    TableAbsence
  },
  created() {
    // request({
    //   url:'/absent/range/class',
    //   method:'get',
    //   headers: {'Authorization': this.$store.state.token},
    // }).then(res=>(this.message=res) )
  }

}
</script>

<style scoped>


</style>