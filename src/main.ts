import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Buy from "./components/Buy.vue";
import Sell from "./components/Sell.vue";
import ProductForm from "./components/ProductForm.vue";
import Product from "./components/Product.vue";
import Pay from "./components/Pay.vue";
import Account from "./components/Account.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Buy,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
    props: true,
  },
  {
    path: "/sell",
    name: "sell",
    component: Sell,
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
  },
  {
    path: "/account",
    name: "account",
    component: Account,
  },
  {
    path: "/productForm",
    name: "productForm",
    component: ProductForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
