<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Product } from './Product';

const store = useStore();
const router = useRouter();

const name = ref('');
const price = ref('');
const description = ref('');
const stock = ref('');
const imageFile = ref(null);
const file = ref('');

const createProduct = () => {
    const newProduct = new Product(
        name.value,
        parseFloat(price.value),
        description.value,
        parseInt(stock.value),
        imageFile.value ? URL.createObjectURL(imageFile.value) : "",
    );

    store.commit('addProduct', newProduct);
    router.push('/sell');
};

const cancel = () => {
    router.push('/sell');
};

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
    <div class="container">
        <h1 class="title has-text-centered">Add Product</h1>
        <form @submit="createProduct" class="p-4">

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Product</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded has-icons-left">
                            <input v-model="name" class="input" type="text" placeholder="Super product"
                                pattern="^(?=(?:[^a-zA-Z]*[a-zA-Z]){2})[\s\S]*$" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-shopping-bag"></i>
                            </span>
                        </p>
                    </div>

                    <div class="field-label is-normal">
                        <label class="label">Price</label>
                    </div>
                    <div class="field is-narrow">
                        <p class="control is-expanded has-icons-left">
                            <input v-model="price" class="input" type="number" step="0.1" min="0.1" placeholder="100"
                                required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-dollar-sign"></i>
                            </span>
                        </p>
                    </div>

                    <div class="field-label is-normal">
                        <label class="label">Stock</label>
                    </div>
                    <div class="field is-narrow">
                        <p class="control is-expanded has-icons-left">
                            <input v-model="stock" class="input" type="number" min="1" placeholder="1" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-box"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Description</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <textarea v-model="description" class="textarea"
                                placeholder="Explain the characteristics of the product" required></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Image</label>
                </div>
                <div class="field-body">
                    <div class="field">
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
                </div>
            </div>

            <div v-if="imagePreview" class="field is-horizontal">
                <div class="field-label"></div>
                <div class="field-body">
                    <img :src="imagePreview" alt="Selected Image">
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label"></label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <div class="field is-grouped is-horizontal">
                                <div class="control">
                                    <button type="submit" class="button is-link">Submit</button>
                                </div>
                                <div class="control">
                                    <button type="button" class="button is-link is-light" @click="cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>
</template>
  


