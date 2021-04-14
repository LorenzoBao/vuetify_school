<template>

  <v-list-group
      :value="false"
      :prepend-icon="listData.icon"
      no-action
  >
    <template v-slot:activator>
      <v-list-item-title>{{listData.title}}</v-list-item-title>
    </template>

    <v-list-item
        v-for="([title,icon,to],i) in listData.data"
        :key="i"
        link
        :to="to"
    >
      <v-list-item-icon>
        <v-icon v-text="icon">mdi-home</v-icon>
      </v-list-item-icon>
      <v-list-item-title v-text="title"></v-list-item-title>
    </v-list-item>

  </v-list-group>
</template>

<script>
export default {
name: "listItem",
 data(){
    return{
   }
  },
  props:{
  listData:{
    type: Object,
  }
  }
}
</script>

<style scoped>

</style>