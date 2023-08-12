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
    path: "/market/buy",
    name: "buy",
    component: Buy,
  },
  {
    path: "/market/product",
    name: "product",
    component: Product,
    props: true,
  },
  {
    path: "/market/sell",
    name: "sell",
    component: Sell,
  },
  {
    path: "/market/pay",
    name: "pay",
    component: Pay,
  },
  {
    path: "/market/account",
    name: "account",
    component: Account,
  },
  {
    path: "/market/sell/productForm",
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
