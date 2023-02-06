<template>
  <div ref="animationWrapper" class="info fade-in" v-if="restaurant?.id">
    <div class="details">
      <span class="name">{{ restaurant.name }}</span>
      <b
        >Rating:
        <span class="normal-font-weight">{{ restaurant.rating }} </span></b
      >
      <b class="address">
        <img src="@/assets/marker-icon.svg" alt="marker-icon" />
        {{ restaurant.location.formatted_address }}
      </b>

      <b class="phone" v-if="restaurant.phone">
        <img src="@/assets/phone-icon.svg" alt="phone-icon" />
        {{ restaurant.phone }}</b
      >
    </div>
    <img class="restaurant-image" :src="restaurant.photos[0]" />
    <div class="reviews" v-if="restaurant.reviews.length">
      <div class="title">Reviews</div>
      <ul>
        <li v-for="(review, index) in restaurant.reviews" :key="index">
          <b
            >Rating:
            <span class="normal-font-weight">{{ review.rating }}</span></b
          >
          <p>{{ review.text }}</p>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="no-restaurant-selected fade-in">
    Select a restaurant to view its information...
  </div>
</template>

<script setup lang="ts">
import { Restaurant } from "../interfaces";
/* eslint-disable */
const props = defineProps<{
  restaurant?: Restaurant;
}>();
/* eslint-enable */
</script>

<style lang="scss" scoped>
.info {
  grid-area: c;
  padding: 25px 45px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "a a b"
    "c c c";
  max-height: calc(100vh - 175px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dark-gray);
  }

  .details {
    grid-area: a;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .name {
      font-size: var(--font-size-huge);
      font-weight: 600;
      text-decoration: underline;
    }

    .address,
    .phone {
      img {
        transform: translate(0, 5px);
      }
    }
  }

  .restaurant-image {
    grid-area: b;
    width: 300px;
    max-height: 300px;
    clip-path: polygon(0 0, 100% 0, 100% 300px, 0 300px);
  }

  .reviews {
    grid-area: c;
    display: fex;
    flex-direction: column;

    .title {
      font-size: var(--font-size-huge);
      font-weight: 600;
      margin-bottom: 20px;
    }

    ul {
      margin: 0;
      padding: 0 0 0 50px;

      li {
        p {
          margin: 15px 0;
        }
      }
    }
  }

  .normal-font-weight {
    font-weight: normal;
  }
}
.no-restaurant-selected {
  grid-area: c;
  display: flex;
  padding-top: 200px;
  justify-content: center;
  font-weight: bold;
}
</style>