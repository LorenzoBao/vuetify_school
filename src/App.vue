<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app

        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
       >

    <MainNav></MainNav>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <MainBar></MainBar>
    </v-app-bar>
    <!--  -->

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MainNav from "@/components/MainNav";
import MainBar from "@/components/bar/MainBar";
export default {
  name: 'App',

  components: {
    MainNav,
    MainBar
  },

  data: () => ({
    drawer: null
  }),
};
</script>
