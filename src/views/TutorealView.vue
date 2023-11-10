<template>
  <Tutoreal msg="Welcome to Your Vue.js App" />
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
