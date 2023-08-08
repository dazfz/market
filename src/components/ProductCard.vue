<script setup lang="ts">
import { useRouter } from 'vue-router';

const { product } = defineProps(['product']);

const router = useRouter();

const buy = () => {
  router.push({
    name: 'product',
    query: { id: product.id },
  });
};
</script>

<template>
  <div class="card product-card" @click="buy">
    <!-- Card Image -->
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="product.image" alt="Product Image">
      </figure>
      <div class="overlay"></div>
    </div>

    <!-- Card Content -->
    <div class="card-content">
      <p class="title is-4">{{ product.name }}</p>
      <div class="is-flex is-justify-content-space-around	">
        <p class="subtitle is-6">$ {{ product.price }}</p>
        <p class="subtitle is-6 has-text-grey">{{ product.date }}</p>
      </div>
    </div>

    <!-- Buy Button -->
    <div class="card-footer">
      <a class="card-footer-item button is-link is-fullwidth">BUY NOW</a>
    </div>
  </div>
</template>

<style>
.product-card {
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.product-card:hover {
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.card-image {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  position: relative;
}

.card-image img {
  transition: transform 0.3s ease;
}

.card-image:hover img {
  transform: scale(1.05);
}

.overlay {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image:hover .overlay {
  opacity: 1;
}

.card-content {
  padding: 1rem;
}

.card-footer {
  border-top: 1px solid #f0f0f0;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.card-footer-item {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}
</style>

  

  
