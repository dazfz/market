<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Product } from './Product';

const store = useStore();
const router = useRouter();
const cart = computed(() => store.getters.getCart);

const productPage = (productID: number) => {
  router.push({
    name: 'product',
    query: { id: productID },
  });
};

// Calcula el precio total acumulado de todos los productos en el carrito
const totalPrice = computed(() => {
  let total = 0;
  for (const [, product] of cart.value) {
    total += product.price * product.stock;
  }
  return total;
});

// Funciones para los botones de aumentar/disminuir cantidad en el carrito
const more = (productInCart: Product) => {
  const product = store.getters.getProduct(productInCart.id);

  if (product.stock > 0) {
    product.stock--;
    productInCart.stock++;
  }
};

const less = (productInCart: Product) => {
  const product = store.getters.getProduct(productInCart.id);

  if (productInCart.stock > 0) {
    product.stock++;
    productInCart.stock--;
  }
};

// Si el precio total es 0 (o menor), se muestra alerta
const less0 = ref(false)
const pay = (price: number) => {
  if (price <= 0) {
    less0.value = true;
    setTimeout(() => { less0.value = false; }, 10000);
    return;
  }
};

// Eliminar product del carro, devuelve el stock a products
const removeCart = (id: string, cartStock: number) => {
  const product = store.getters.getProduct(id);
  product.stock += cartStock;
  store.commit('removeFromCart', id);
};
</script>

<template>
  <div class="container is-flex is-flex-direction-column">
    <h1 class="title has-text-centered">Products in cart</h1>

    <div class="table-container p-4">
      <table class="table is-bordered is-striped is-hoverable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[id, product] in cart.entries()" :key="id">
            <td>
              <figure class="image is-3by2 product-image" @click="productPage(product.id)">
                <img :src="product.imageURL">
              </figure>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.stock }}</td>
            <td>${{ product.price }}</td>
            <td>${{ product.price * product.stock }}</td>
            <td>
              <div class="field is-grouped">
                <p class="control">
                  <button class="button is-small is-outlined" @click="less(product)">
                    <span class="icon">
                      <i class="fas fa-minus"></i>
                    </span>
                  </button>
                  <button class="button is-small is-outlined" @click="more(product)">
                    <span class="icon">
                      <i class="fas fa-plus"></i>
                    </span>
                  </button>
                </p>
                <p class="control">
                  <button class="button is-small is-danger is-outlined" @click="removeCart(product.id, product.stock)">
                    <span class="icon">
                      <i class="fas fa-trash"></i>
                    </span>
                  </button>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="4" class="has-text-right">Total:</th>
            <th>${{ totalPrice }}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>

      <div class="has-text-centered">
        <button class="button is-fullwidth is-info" @click="pay(totalPrice)">
          Proceed to payment: ${{ totalPrice }}</button>
      </div>
    </div>

    <div v-if="less0" class="notification is-danger">
      <button class="delete" @click="less0 = false"></button>Error: No products in the cart
    </div>
  </div>
</template>

<style>
.table th,
.table td {
  vertical-align: middle;
}

.table-container {
  margin: 0 auto;
}

table {
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.product-image {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.product-image img {
  border-radius: 5px;
}

.product-image:hover {
  transform: scale(1.1);
}

@media screen and (max-width: 768px) {
  td .is-grouped {
    flex-direction: column;
  }

  .two-buttons {
    display: flex;
    flex-direction: row;
  }
}
</style>
