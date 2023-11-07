<template>
  <v-container>
    <board-surface v-bind="props"></board-surface>
  </v-container>
</template>

<script>
import BoardSurface from "./organisms/BoardSurface.vue";
export default {
  components: { BoardSurface },
  name: "HelloWorld",
  data: () => ({
    props: {
      playerHands: ["s1", "hk", "c7", "dj", "j1"],
      hiddenHands: 5,
      discard: "s1",
    },
  }),
};
</script>
