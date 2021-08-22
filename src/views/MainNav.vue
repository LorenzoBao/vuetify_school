<template>
<v-list>
  <mainMenu></mainMenu>
  <Administration></Administration>
</v-list>



</template>

<script>
import mainMenu from "./navItem/mainMenu";
import Administration from "./navItem/Administration";
export default {
name: "MainNav",
  components:{
    mainMenu,
    Administration
  }
}
</script>

<style scoped>

</style>