import { createStore } from "vuex";
import axios from "axios";
import { Product } from "./components/Product";

const store = createStore({
  state: {
    products: new Map<number, Product>(),
    cart: new Map<number, Product>(),
  },
  getters: {
    getProducts: (state) => state.products,
    getCart: (state) => state.cart,
    getProduct: (state) => (id: number) => {
      return state.products.get(id);
    },
  },
  actions: {
    // GET
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get("/api/products");
        const productsData = response.data;

        productsData.forEach((productData: any) => {
          const product = new Product(
            productData.id,
            productData.name,
            productData.price,
            productData.description,
            productData.stock,
            null,
            productData.imageURL
          );
          commit("addProduct", product);
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    // POST
    async postProduct({ commit }, product) {
      try {
        const response = await axios.post("/api/products", product, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const addedProduct = response.data;
        commit("addProduct", addedProduct);
      } catch (error) {
        console.error("Error adding product:", error);
        throw error;
      }
    },

    // DELETE
    async deleteProduct({ commit }, id) {
      try {
        const response = await axios.delete(`/api/products/${id}`);
        if (response.status === 204) {
          commit("removeProduct", id);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    },

    // PUT
    async updateProductBE({ commit }, editedProduct) {
      try {
        let response;
        // Si hay imagen nueva, hacer POST
        if (editedProduct.image) {
          response = await axios.post(
            `/api/products/${editedProduct.id}`,
            editedProduct,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.put(
            `/api/products/${editedProduct.id}`,
            editedProduct
          );
        }
        const updatedProduct = response.data;
        updatedProduct.image = null;
        commit("updateProduct", updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
        throw error;
      }
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
        Object.assign(product, editedProduct);
      }
    },
  },
});
store.dispatch("fetchProducts");
export default store;
