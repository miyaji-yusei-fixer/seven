<template>
  <div class="home">
    <Tutoreal msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Tutoreal from "@/components/organisms/Tutorial.vue";

export default {
  name: "HomeView",
  components: {
    Tutoreal,
  },
};
</script>
