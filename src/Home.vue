<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >

      <MainNav></MainNav>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>管理系统</v-toolbar-title>
      <MainBar></MainBar>
    </v-app-bar>
    <!--  -->

    <v-main>
      <!--  -->
      <div id="mainDiv">
        <router-view></router-view>
      </div>

    </v-main>
  </v-app>
</template>

<script>
import MainNav from "./views/MainNav";
import MainBar from "./views/MainBar";

export default {
name: "Home",
  components:{
    MainNav,
    MainBar
  },

  data: () => ({
    drawer: null
  }),
}
</script>

<style scoped>
#mainDiv{
  margin: 5px 25px;
}
</style>