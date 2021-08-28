<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="dates"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="dateRangeText"
          label="请选择时间"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="dates"
        no-title
        scrollable
        range
        locale="zh-cn"
    >
      <v-spacer></v-spacer>
      <v-btn
          text
          color="primary"
          @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
          text
          color="primary"
          @click="$refs.menu.save(dates)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
name: "times",
  data:()=>({
    dates: ['2019-04-10', '2021-09-19'],
    menu: false,
    modal: false,
    menu2: false,
  }),
   computed: {
     dateRangeText () {
       return this.dates.join(' ~ ')
     },

   },




}
</script>

<style scoped>

</style>