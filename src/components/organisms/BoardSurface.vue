<template>
  <dev>
    <v-row>
      <hands-hidden class="hands-hidden" :hands="hiddenHands" />
    </v-row>
    <v-row>
      <deck :discard="discard" />
    </v-row>
    <v-row>
      <hands-showed :hands="playerHands" />
    </v-row>
  </dev>
</template>

<script>
import Deck from "@/components/molecules/Deck.vue";
import HandsShowed from "@/components/molecules/HandsShowed.vue";
import HandsHidden from "@/components/molecules/HandsHidden.vue";
import { marks } from "@/utils/mark/markUtil";

export default {
  props: {
    playerHands: {
      type: Array,
      required: true,
      validator: function (array) {
        return array.some((value) => marks.indexOf(value) !== -1);
      },
    },
    hiddenHands: {
      type: Number,
      required: true,
    },
    discard: {
      type: String,
      required: true,
      validator: function (value) {
        return marks.indexOf(value) !== -1;
      },
    },
  },
  components: { Deck, HandsShowed, HandsHidden },
};
</script>

<style>
.card {
  padding: 0;
}
.hands-hidden {
  transform: rotate(180deg);
}
</style>