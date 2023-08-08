import { createStore } from "vuex";
import { Product } from "./components/Product";
import xdImage from "./xd.jpg";

const products = new Map<string, Product>();

const product1 = new Product(
  "Smartphone X",
  799,
  "The Smartphone X combines cutting-edge technology with a sleek design, offering a high-resolution display and a powerful processor for smooth performance.",
  2,
  xdImage
);
products.set(product1.id, product1);

const product2 = new Product(
  "UltraBook Pro",
  1299,
  "The UltraBook Pro is a lightweight and powerful laptop, featuring a stunning display, long-lasting battery life, and a backlit keyboard for comfortable typing in any environment.",
  30,
  xdImage
);
products.set(product2.id, product2);

const product3 = new Product(
  "Smart Home Hub",
  199,
  "The Smart Home Hub acts as the central command center for your smart home devices, allowing you to control lights, thermostats, cameras, and more with a simple voice command.",
  100,
  xdImage
);
products.set(product3.id, product3);

const product4 = new Product(
  "Wireless Earbuds",
  89,
  "Enjoy true wireless freedom with our Wireless Earbuds. These earbuds deliver high-quality sound and come with a charging case that provides hours of playback on a single charge.",
  150,
  xdImage
);
products.set(product4.id, product4);

const product5 = new Product(
  "Fitness Tracker Pro",
  129,
  "The Fitness Tracker Pro helps you stay on top of your fitness goals by tracking your steps, heart rate, sleep patterns, and more. It also features a built-in GPS for accurate outdoor workouts.",
  80,
  xdImage
);
products.set(product5.id, product5);

const product6 = new Product(
  "Gaming Console Plus",
  499,
  "Experience the next level of gaming with our Gaming Console Plus. It supports 4K gaming, HDR graphics, and comes with a vast library of exclusive titles to keep you entertained for hours.",
  40,
  xdImage
);
products.set(product6.id, product6);

const product7 = new Product(
  "Portable Blender",
  39,
  "Blend your favorite smoothies on the go with our Portable Blender. Its compact design and rechargeable battery make it perfect for travel, gym, or outdoor activities.",
  120,
  xdImage
);
products.set(product7.id, product7);

const product8 = new Product(
  "Smart Door Lock",
  149,
  "Enhance your home security with the Smart Door Lock. It allows keyless entry, remote access, and provides notifications on your smartphone when someone enters or leaves your home.",
  60,
  xdImage
);
products.set(product8.id, product8);

export default createStore({
  state: {
    products,
    cart: new Map<string, Product>(),
  },
  getters: {
    getProducts: (state) => state.products,
    getCart: (state) => state.cart,
    getProduct: (state) => (id: string) => {
      return state.products.get(id);
    },
  },
  mutations: {
    addProduct(state, product) {
      state.products.set(product.id, product);
    },
    addToCart(state, product) {
      state.cart.set(product.id, product);
    },
    removeFromCart(state, productId) {
      state.cart.delete(productId);
    },
    removeProduct(state, productId) {
      state.products.delete(productId);
      state.cart.delete(productId);
    },
    updateProduct(state, editedProduct) {
      const product = state.products.get(editedProduct.id);
      if (product !== undefined) {
        const { name, price, description, image, date } = editedProduct;
        Object.assign(product, { name, price, description, image, date });
      }
    },
  },
});
