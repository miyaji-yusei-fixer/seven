<template>
  <v-container class="green">
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
export default {
  components: { BoardSurface },
  name: "HelloWorld",
  data: () => ({
    game: new Game(),
    selectedCard: [],
  }),
  computed: {
    props() {
      return {
        playerHands: this.game.playerHands,
        hiddenHands:
          this.game.turn != "finished"
            ? this.game.enemyHands.length
            : this.game.enemyHands,
        deckSheets: this.game.deck.length,
        discard: this.game.discard[0],
      };
    },
    turn() {
      return this.game.turn;
    },
    isDisabledDeck() {
      return !(this.selectedCard.length && this.game.turn == "player");
    },
  },
  methods: {
    async onClickDeck() {
      const result = await this.game.throwAndDrawDeck(this.selectedCard);
      this.selectedCard = [];
      this.$refs.boardSurface.resetSelect();
      if (typeof result == "string") {
        setTimeout(() => alert(result), 1000)
      }
    },
    async onClickDiscard() {
      const result = await this.game.throwAndDrawDiscard(this.selectedCard);
      this.selectedCard = [];
      this.$refs.boardSurface.resetSelect();
      if (typeof result == "string") {
        setTimeout(() => alert(result), 1000)
      }
    },
    selectCard(selectedCard) {
      this.selectedCard = selectedCard;
    },
  },
};
</script>
