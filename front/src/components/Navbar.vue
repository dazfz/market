<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cart = computed(() => store.getters.getCart);
const activeLink = ref('/');

const setActive = (route: string) => {
    activeLink.value = route;
};

const isActive = (route: string) => {
    return activeLink.value === route;
};

</script>

<template>
    <nav class="tabs is-right is-5 subtitle">
        <ul class="is-flex is-justify-content-space-between">
            <li class="icon-text"><span class="icon"><i class="fas fa-store"></i></span>Market</li>
            <li class="is-flex">
            <li :class="{ 'is-active': isActive('/market/pay') }">
                <router-link to="/market/pay" @click.native="setActive('/market/pay')">
                    <span class="icon is-small"><i class="far fa-credit-card" aria-hidden="true"></i></span>
                    <span class="nav-text">Pay</span>
                    <span v-if="cart.size > 0" class="tag is-danger is-rounded ml-2">{{ cart.size }}</span>
                </router-link>
            </li>
            <li :class="{ 'is-active': isActive('/market/buy') }">
                <router-link to="/market/buy" @click.native="setActive('/market/buy')">
                    <span class="icon is-small"><i class="fas fa-shopping-cart" aria-hidden="true"></i></span>
                    <span class="nav-text">Buy</span>
                </router-link>
            </li>
            <li :class="{ 'is-active': isActive('/market/sell') }">
                <router-link to="/market/sell" @click.native="setActive('/market/sell')">
                    <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                    <span class="nav-text">Sell</span>
                </router-link>
            </li>
            <li :class="{ 'is-active': isActive('/market/account') }">
                <router-link to="/market/account" @click.native="setActive('/market/account')">
                    <span class="icon is-small"><i class="fas fa-user" aria-hidden="true"></i></span>
                    <span class="nav-text">Account</span>
                </router-link>
            </li>
            </li>
        </ul>
    </nav>
</template>
  
<style>
li li {
    position: relative;
}

.tag {
    position: absolute;
    top: -1px;
    right: 0;
}

ul li li .icon {
    transition: transform 0.2s ease-in-out;
}

ul li li:hover .icon {
    transform: scale(1.2);
}

@media screen and (max-width: 768px) {
    .tabs ul {
        flex-direction: column;
    }

    .nav-text {
        display: none;
    }
}
</style>