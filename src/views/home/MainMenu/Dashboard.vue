<template>
  <div>
    <failDialogs  ref="failDialogs"></failDialogs>
    <h2>首页</h2>
  </div>
</template>

<script>
import {getAdminInfo} from "../../../network/adminApi";
import $store from  '../../../store'
import {ifthen} from "../../../network/FN";
import failDialogs from "../../../components/HomeItem/failDialogs";
export default {
name: "Dashboard",
  components:{
    failDialogs
  },

}
</script>

<style scoped>

</style>