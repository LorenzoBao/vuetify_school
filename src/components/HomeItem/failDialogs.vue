
<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          提示
        </v-card-title>

        <v-card-text>
          {{text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            知道了！
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
name: "failDialogs",
  data () {
    return {
      dialog: false,
      text:'操作失败，请刷新页面'
    }
  },
}
</script>

<style scoped>

</style>