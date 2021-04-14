<template>
  <v-avatar
      id="avatar"
      color="primary"
      size="35"
  >
    <div class="text-center">
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
        a
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
  </v-avatar>
</template>

<script>
export default {
name: "Avatar",
  data(){
  return{
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }
  }
}
</script>

<style scoped>
#avatar{
position: fixed;
  right: 30px;
}
</style>