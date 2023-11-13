<template>
  <v-container class="green board-surface">
    <v-row>
      <HandsHidden
        v-if="!Array.isArray(this.hiddenHands)"
        class="hands-hidden"
        :hands="hiddenHands"
        :selected="hiddenSelected"
      />
      <HandsShowed
        v-else
        :isDisabled="true"
        class="hands-hidden"
        :hands="hiddenHands"
      />
    </v-row>
    <v-row class="deck">
      <Deck
        :deckSheets="deckSheets"
        :discard="discard"
        :isDisabled="isDisabledDeck"
        @onClickDeck="onClickDeck"
        @onClickDiscard="onClickDiscard"
      />
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <HandsShowed
        ref="handsShowed"
        :isDisabled="isDisabledHands"
        :hands="playerHands"
        @selectCard="selectCard"
      />
    </v-row>
  </v-container>
</template>

<script>
import Deck from "@/components/molecules/Deck.vue";
import HandsShowed from "@/components/molecules/HandsShowed.vue";
import HandsHidden from "@/components/molecules/HandsHidden.vue";
import { marks } from "@/utils/mark/markUtil";

export default {
  name: "BoardSurface",
  components: { Deck, HandsShowed, HandsHidden },
  props: {
    playerHands: {
      type: Array,
      required: true,
      validator: function (array) {
        return array.some((value) => marks.indexOf(value) !== -1);
      },
    },
    hiddenHands: {
      // type: Number || Array,
      required: true,
    },
    hiddenSelected: {
      type: Array,
      default: () => [],
    },
    deckSheets: {
      type: Number,
      required: true,
      validator: function (value) {
        return value <= 52;
      },
    },
    discard: {
      type: String,
      required: true,
      validator: function (value) {
        return marks.indexOf(value) !== -1;
      },
    },
    isDisabledDeck: {
      type: Boolean,
      default: false,
    },
    isDisabledHands: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickDeck() {
      this.$emit("onClickDeck");
    },
    onClickDiscard() {
      this.$emit("onClickDiscard");
    },
    selectCard(selecedtCard) {
      this.$emit("selectCard", selecedtCard);
    },
    resetSelect() {
      this.$refs.handsShowed.resetSelect();
    },
  },
};
</script>

<style lang="scss">
.board-surface {
  padding: 24px;
}
.card {
  padding: 0;
}
.deck {
  margin: 24px 0;
}
.hands-hidden {
  transform: rotate(180deg);
}
</style>