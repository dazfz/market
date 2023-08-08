<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const cart = computed(() => store.state.cart);

const productId = String(route.query.id);
const product = store.getters.getProduct(productId);

const quantity = ref(1);
const numericPrice = product.price
const total = ref(quantity.value * numericPrice);

const pay = () => {
  router.push({
    name: 'pay',
  });
};

const more = () => {
  if (product.stock > quantity.value) {
    quantity.value++;
    total.value = quantity.value * numericPrice;
  }
};

const less = () => {
  if (quantity.value > 1) {
    quantity.value--;
    total.value = quantity.value * numericPrice;
  }
};

// Alerta
const showSuccessNotification = ref(false);
const showFailedNotification = ref(false);
const addCart = () => {
  if (!product.stock) {
    showFailedNotification.value = true;
    setTimeout(() => {
      showFailedNotification.value = false;
    }, 10000);
    return;
  }
  // Verifica si el producto ya está en el carrito
  const productInCart = cart.value.get(product.id);

  if (productInCart) productInCart.stock += quantity.value;
  else store.commit('addToCart', { ...product, stock: quantity.value });

  showSuccessNotification.value = true;
  setTimeout(() => {
    showSuccessNotification.value = false;
  }, 10000);

  // Resta la cantidad seleccionada del stock disponible si es menor o igual
  if (quantity.value <= product.stock) product.stock -= quantity.value;
  else product.stock = 0; // Si se intenta agregar más de lo disponible, establece el stock a cero
};

</script>

<template>
  <div class="container p-4">
    <div class="card has-background-light custom-card ">
      <div class="card-content">
        <div class="tile is-ancestor">
          <div class="tile is-parent">

            <div class="tile is-child is-half">
              <figure class="image image-container">
                <img :src="product.image" alt="Product Image">
              </figure>
            </div>

            <div class="tile is-child is-half is-5 product-details">
              <h1 class="title is-size-3">{{ product.name }}</h1>
              <p class="subtitle is-size-5">${{ product.price }}</p>
              <p class="mb-4">{{ product.description }}</p>
              <p class="mb-4">In stock: {{ product.stock }}</p>
              <p class="mb-4">Date added: {{ product.date }}</p>

              <div class="field has-addons mb-4">
                <p class="control">
                  <button class="button is-rounded" @click="less">-</button>
                </p>
                <p class="control">
                  <button class="button custom-button">{{ quantity }}</button>
                </p>
                <p class="control">
                  <button class="button is-rounded" @click="more">+</button>
                </p>
              </div>
              <p class="mb-4">Total Price: ${{ total }}</p>

              <div class="buttons">
                <button class="button is-warning is-rounded" @click="addCart">
                  <span class="icon">
                    <i class="fas fa-shopping-cart"></i>
                  </span>
                  <span>Add to the cart</span>
                </button>
                <button class="button is-success is-rounded" @click="pay">
                  <span class="icon">
                    <i class="far fa-credit-card"></i>
                  </span>
                  <span>Pay</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSuccessNotification" class="notification is-success">
      <button class="delete" @click="showSuccessNotification = false"></button>
      Product added to the cart
      <span class="icon"><i class="fas fa-check-circle"></i></span>
    </div>
    <div v-if="showFailedNotification" class="notification is-danger">
      <button class="delete" @click="showFailedNotification = false"></button>
      Product out of stock
      <span class="icon"><i class="fas fa-times-circle"></i></span>
    </div>

  </div>
</template>
  
<style>
.notification {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.tile {
  padding: 10px;
}

.custom-button {
  pointer-events: none;
  cursor: default;
}

.custom-card {
  border-radius: 10px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  display: flex;
  align-items: center;

}

.image-container {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  position: relative;
}

.image-container img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.1);
}

.product-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.buttons button {
  flex: 1;
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

.buttons button:last-child {
  margin-right: 0;
}

.buttons button:hover {
  transform: scale(1.05);
}

.icon {
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

.buttons button:hover .icon {
  transform: rotate(360deg);
}
</style>

  