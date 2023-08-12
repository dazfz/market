<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

const store = useStore();
const products = computed(() => store.getters.getProducts);
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered">Products</h1>
    <div class="columns is-multiline">
      <div class="column is-4 is-3-desktop" v-for="[id, product] in products.entries()" :key="id">
        <div class="card has-background-light has-border-primary is-4by3">
          <div class="card-content has-text-centered">
            <product-card :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
