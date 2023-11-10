<template>
  <v-card class="edge" flat>
    <v-img
      min-width="100px"
      :aspect-ratio="10000 / 14157"
      :width="width"
      :src="markSrt()"
      @click="onClick"
    />
  </v-card>
</template>

<script>
import defaultCards from "@/utils/cardsImg/default/settings.json";

export default {
  props: {
    width: {
      type: Number || String,
      default: 100,
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
    markSrt() {
      return defaultCards["bk"];
    },
  },
};
</script>

<style lang="scss">
.edge {
  width: fit-content;
  height: fit-content;
}
</style>