<template>
  <v-list-item :to="navItemData.to">
    <v-list-item-icon>
      <v-icon v-text="navItemData.icon"></v-icon>
    </v-list-item-icon>
    <v-list-item-title v-text="navItemData.title"></v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
name: "navItem",
  props:{
    navItemData:{
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>