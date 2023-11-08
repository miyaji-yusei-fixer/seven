<template>
  <v-container>
    <hands-showed isDisabled :hands="enemyHands" />
    <board-surface
      ref="boardSurface"
      v-bind="props"
      @onClickDeck="onClickDeck"
      @onClickDiscard="onClickDiscard"
      @selectCard="selectCard"
      :isDisabledDeck="isDisabledDeck"
      :isDisabledHands="turn != 'player'"
    ></board-surface>
  </v-container>
</template>

<script>
import BoardSurface from "@/components/organisms/BoardSurface.vue";
import { Game } from "@/script/game";
import HandsShowed from "./molecules/HandsShowed.vue";
export default {
  components: { BoardSurface, HandsShowed },
  name: "HelloWorld",
  data: () => ({
    game: new Game(),
    selectedCard: [],
  }),
  computed: {
    props() {
      return {
        playerHands: this.game.playerHands,
        hiddenHands: this.game.enemyHands.length,
        deckSheets: this.game.deck.length,
        discard: this.game.discard[0],
      };
    },
    turn() {
      return this.game.turn;
    },
    // 後で消す
    enemyHands() {
      return this.game.enemyHands;
    },
    isDisabledDeck() {
      return !(this.selectedCard.length && this.game.turn == "player");
    },
  },
  methods: {
    onClickDeck() {
      this.game.throwAndDrawDeck(this.selectedCard);
      this.selectedCard = [];
      this.$refs.boardSurface.resetSelect();
    },
    onClickDiscard() {
      this.game.throwAndDrawDiscard(this.selectedCard);
      this.selectedCard = [];
      this.$refs.boardSurface.resetSelect();
    },
    selectCard(selectedCard) {
      this.selectedCard = selectedCard;
    },
  },
};
</script>
