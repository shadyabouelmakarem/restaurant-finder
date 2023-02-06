<template>
  <div class="page-layout">
    <HeaderComponent />
    <RestaurantList
      @selectRestaurant="(value) => (selectedRestaurant.value = value)"
    />
    <RestaurantInfo :restaurant="selectedRestaurant.value" />
  </div>
</template>
<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import RestaurantList from "./components/RestaurantList.vue";
import RestaurantInfo from "./components/RestaurantInfo.vue";
import { reactive } from "@vue/reactivity";

const selectedRestaurant = reactive({});
</script>

<style lang="scss" scoped>
.page-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "a a a a"
    "b c c c"
    "b c c c";
  height: 100%;
}
</style>