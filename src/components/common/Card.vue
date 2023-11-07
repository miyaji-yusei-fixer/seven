<template>
  <v-card class="edge">
    <v-img
      min-width="100px"
      :aspect-ratio="10000 / 14157"
      :width="width"
      :src="markSrt(mark)"
      @click="onClick"
    />
  </v-card>
</template>

<script>
import defaultCards from "@/utils/cardsImg/default/settings.json";
import { marks } from "@/utils/mark/markUtil";

export default {
  name: "Card",
  props: {
    width: {
      type: Number || String,
      default: 100,
    },
    mark: {
      type: String,
      required: true,
      validator: function (value) {
        return marks.indexOf(value) !== -1;
      },
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
    markSrt(mark) {
      return defaultCards[mark];
    },
  },
};
</script>

<style>
.edge {
  min-width: fit-content;
  height: fit-content;
}
</style>