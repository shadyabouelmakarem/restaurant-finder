<template>
  <div class="restaurant-list fade-in">
    <p>{{ restaurants.length }} Restaurants</p>
    <ul>
      <li v-for="restaurant of restaurants" :key="restaurant.id"
        :class="{ selected: selectedRestaurant.id === restaurant.id }" @click="selectRestaurant(restaurant)">
        <div>{{ restaurant.name }}</div>
        <div class="restaurant-address">
          <img src="@/assets/marker-icon.svg" alt="marker-icon" />
          {{ parseLocation(restaurant.location) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Restaurant } from "@/interfaces";
import ServerResponse from "../../data.json";
import { parseLocation } from "@/helpers/location";
import { ref } from "@vue/reactivity";

const emit = defineEmits<{
  (event: "selectRestaurant", restaurant: Restaurant): void;
}>();

const restaurants: Restaurant[] = ServerResponse.data.search.business;
const selectedRestaurant = ref({} as Restaurant);

function selectRestaurant(restaurant: Restaurant) {
  selectedRestaurant.value = restaurant;
  /* for the simplicity of the task I'm using emmiters.
    for real project we would mostly go with state management approach (ex: Vuex)
    or use a pup-supp pattern depending on the use case */
  emit("selectRestaurant", restaurant);
}
</script>

<style lang="scss" scoped>
.restaurant-list {
  grid-area: b;
  border-right: 1px solid var(--dark-gray);

  p {
    display: flex;
    align-items: center;
    background: var(--light-gray);
    margin: 0;
    padding: 0 45px;
    font-weight: 600;
    height: 75px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: calc(100vh - 175px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--dark-gray);
    }

    li {
      padding: 25px 45px;
      border-bottom: 1px solid var(--light-gray);
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.25s ease-out;

      &:hover,
      &.selected {
        background: var(--sky-blue);
      }

      .restaurant-address {
        font-size: var(--font-size-small);

        img {
          transform: translate(0, 5px);
        }
      }
    }
  }
}
</style>