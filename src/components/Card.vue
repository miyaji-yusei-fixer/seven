<template>
  <img :width="width" :src="markSrt(mark)" />
</template>

<script>
import defaultCards from "@/utils/cardsImg/default/settings.json";
import { marks } from "@/utils/mark/markUtil";

export default {
  props: {
    width: {
      type: Number | String,
      default: "100px",
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
    markSrt(mark) {
      return defaultCards[mark];
    },
  },
};
</script>