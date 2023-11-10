<template>
  <PlayGame msg="Welcome to Your Vue.js App" />
</template>

<script>
// @ is an alias to /src
import PlayGame from "@/components/organisms/PlayGame.vue";

export default {
  name: "HomeView",
  components: {
    PlayGame,
  },
};
</script>
