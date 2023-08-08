<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Product } from './Product';

const store = useStore();
const router = useRouter();
const products = computed(() => store.getters.getProducts);

// Routes
const add = () => {
    router.push({
        name: 'productForm',
    });
};

const productPage = (productID: string) => {
    router.push({
        name: 'product',
        query: { id: productID },
    });
};

// Total
const earning = computed(() => {
    let total = 0;
    for (const [, product] of products.value) {
        total += product.price * (product.ogstock - product.stock);
    }
    return total;
});

// Buttons
const more = (product: Product) => {
    product.stock++;
    product.ogstock++;
};

const less = (product: Product) => {
    if (product.stock > 0) {
        product.stock--;
        product.ogstock--;
    }
};

const remove = (id: string) => {
    store.commit('removeProduct', id);
};

const isEditModalOpen = ref(false);
const editedProduct = ref<Product | null>(null);

const imageFile = ref(null);
const file = ref('');

const edit = (editedProduct: Product) => {
    if (imageFile.value != null)
        editedProduct.image = URL.createObjectURL(imageFile.value);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    editedProduct.date = formattedDate;
    store.commit('updateProduct', editedProduct);
    closeEditModal();
};

// Modal
const openEditModal = (product: Product) => {
    editedProduct.value = { ...product };
    isEditModalOpen.value = true;
    document.documentElement.classList.add('is-clipped');
};

const closeEditModal = () => {
    isEditModalOpen.value = false;
    editedProduct.value = null;
    imageFile.value = null;
    file.value = '';
    document.documentElement.classList.remove('is-clipped');
};

// Imagen nueva en el modal
const onImageChange = (event: any) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
        imageFile.value = fileInput.files[0];
        file.value = fileInput.files[0].name;
    } else {
        imageFile.value = null;
        file.value = '';
    }
};

const imagePreview = computed(() => {
    return imageFile.value ? URL.createObjectURL(imageFile.value) : null;
});
</script>

<template>
    <div class="container is-flex is-flex-direction-column">
        <h1 class="title has-text-centered">My Products</h1>

        <div class="table-container p-4">
            <div class="has-text-centered">
                <button class="button is-fullwidth is-success mb-4" @click="add()">
                    Add new product</button>
            </div>
            <table class="table is-bordered is-striped is-hoverable">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Stock</th>
                        <th>Unit Price</th>
                        <th>Sold</th>
                        <th>Earnings</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="[id, product] in products.entries()" :key="id">
                        <td>
                            <figure class="image is-3by2 product-image" @click="productPage(product.id)">
                                <img :src="product.image">
                            </figure>
                        </td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.stock }}</td>
                        <td>${{ product.price }}</td>
                        <td>{{ product.ogstock - product.stock }}</td>
                        <td>${{ product.price * (product.ogstock - product.stock) }}</td>
                        <td>
                            <div class="field is-grouped">
                                <p class="control two-buttons">
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
                                <p class="control has-addons">
                                    <button class="button is-small is-info" @click="openEditModal(product)">
                                        <span class="icon">
                                            <i class="fas fa-edit"></i>
                                        </span>
                                    </button>
                                    <button class="button is-small is-danger" @click="remove(product.id)">
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
                        <th colspan="5" class="has-text-right">Total:</th>
                        <th>${{ earning }}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <!--MODAL-->
    <div class="modal" :class="{ 'is-active': isEditModalOpen }">
        <div class="modal-background" @click="closeEditModal"></div>
        <div class="modal-card p-3" v-if="editedProduct">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ editedProduct.name }}</p>
                <button class="delete" aria-label="close" @click="closeEditModal"></button>
            </header>
            <section class="modal-card-body">

                <div class="field">
                    <label class="label">Product</label>
                    <div class="control has-icons-left">
                        <input v-model="editedProduct.name" class="input" type="text"
                            pattern="^(?=(?:[^a-zA-Z]*[a-zA-Z]){2})[\s\S]*$" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-shopping-bag"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Price</label>
                    <div class="control has-icons-left">
                        <input v-model="editedProduct.price" class="input" type="number" step="0.1" min="0.1"
                            placeholder="100" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-dollar-sign"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea v-model="editedProduct.description" class="textarea"
                            placeholder="Explain the characteristics of the product" required></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Image</label>
                    <div class="control">
                        <div class="file has-name">
                            <label class="file-label">
                                <input class="file-input" type="file" @change="onImageChange" accept="image/*" required>
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose a file
                                    </span>
                                </span>
                                <span class="file-name">{{ file ? file : 'No file chosen' }}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div v-if="imagePreview" class="field">
                    <img :src="imagePreview" alt="Selected Image">
                </div>
            </section>

            <footer class="modal-card-foot">
                <button class="button is-success" type="submit" @click="edit(editedProduct)">Save changes</button>
                <button class="button" @click="closeEditModal">Cancel</button>
            </footer>
        </div>
    </div>
</template>
