<template>
  <div class="restaurant-list">
    <p>{{ restaurants.length }} Restaurants</p>
    <ul>
      <li
        v-for="restaurant of restaurants"
        :key="restaurant.id"
        :class="{ selected: selectedRestaurant.value?.id === restaurant.id }"
        @click="selectRestaurant(restaurant)"
      >
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
import { Restaurant } from "../interfaces";
import ServerResponse from "../../data.json";
import { parseLocation } from "../helpers/location";
import { reactive } from "@vue/reactivity";

/* eslint-disable */
const emit = defineEmits<{
  (event: "selectRestaurant", restaurant: Restaurant): void;
}>();
/* eslint-enable */

const restaurants: Restaurant[] = ServerResponse.data.search.business;
const selectedRestaurant = reactive({});

function selectRestaurant(restaurant: Restaurant) {
  this.selectedRestaurant.value = restaurant;
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
    background: var(--light-gray);
    margin: 0;
    padding: 25px 45px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

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