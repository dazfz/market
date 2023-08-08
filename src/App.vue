<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
  beforeMount() {
    const router = useRouter();
    router.push("/market/buy");
  },
});
</script>

<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>


