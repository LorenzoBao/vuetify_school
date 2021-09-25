<template>

  <v-breadcrumbs id="bread" :items="breadcrumbsItemData">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
          :to="item.to"
          :disabled="item.disabled"
      >
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  data: () => ({}),

  props: {
    breadcrumbsItemData: {
      type: Array,
      default() {
        return {
          items: [
            {
              text: 'Dashboard',
              disabled: false,
              to: '/Dashboarda',
            },

          ],
        }

      }
    }
  }

}

</script>

<style scoped>
#bread {
  height: 5px;
  width: 100%;
}
</style>