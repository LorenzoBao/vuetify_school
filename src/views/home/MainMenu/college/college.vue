<template>
  <div >
    <h2>学院管理</h2>
    <Breadcrumbs :breadcrumbsItemData="Breaditems"></Breadcrumbs>
    <TableCollege></TableCollege>
  </div>
</template>

<script>
import TableCollege from "../../../../components/HomeItem/TableCollege";
import Breadcrumbs from "../../../../components/HomeItem/Breadcrumbs";
export default {
  name:'college',
  data () {
    return {
      Breaditems: [
        {
          text: '首页',
          disabled: false,
          to: '/Dashboard',
        },
        {
          text: '学院管理',
          disabled: true,
          to: '/college',
        },
      ],
    }
  },
  components: {
    TableCollege,
    Breadcrumbs
  },

}
</script>

<style scoped>

</style>