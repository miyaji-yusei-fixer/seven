<template>
  <img :width="width" :src="markSrt()" />
</template>

<script>
import defaultCards from "@/utils/cardsImg/default/settings.json";

export default {
  props: {
    width: {
      type: Number | String,
      default: "100px",
    },
  },
  methods: {
    markSrt() {
      return defaultCards["bk"];
    },
  },
};
</script>