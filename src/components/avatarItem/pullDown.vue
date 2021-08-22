<template>
  <v-card
      class="mx-auto"
      max-width="344"
  >

    <v-card-actions>
      <v-btn
          color="orange lighten-2"
          text
      >
        个人信息
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
          icon
          @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <slot></slot>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
name: "pillDown",
  data(){
    return{
      show: false,

    }
  }
}
</script>

<style scoped>

</style>