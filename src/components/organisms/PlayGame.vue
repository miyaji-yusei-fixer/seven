<template>
  <v-container class="play-game green" fluid>
    <v-app-bar dark color="green lighten-1">
      <v-toolbar-title>{{
        phase == "finished" ? "Finished" : `Turn: ${turn}`
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{
        phase == "finished" ? "" : `${phase} Phase`
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{
        phase == "finished"
          ? ""
          : `${game.playerHands.length}：${game.enemyHands.length}`
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="newGame" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>

    <board-surface
      ref="boardSurface"
      v-bind="props"
      @onClickDeck="onClickDeck"
      @onClickDiscard="onClickDiscard"
      @selectCard="selectCard"
      :isDisabledDeck="isDisabledDeck"
      :isDisabledHands="phase != 'player'"
    />
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
          this.game.phase != "finished"
            ? this.game.enemyHands.length
            : this.game.enemyHands,
        hiddenSelected: this.game.enemySelect,
        deckSheets: this.game.deck.length,
        discard: this.game.discard[0],
      };
    },
    turn() {
      return this.game.turn;
    },
    phase() {
      return this.game.phase;
    },
    isDisabledDeck() {
      return !(this.selectedCard.length && this.game.phase == "player");
    },
  },
  methods: {
    newGame() {
      this.game = new Game();
    },
    async onClickDeck() {
      this.$refs.boardSurface.resetSelect();
      const result = await this.game.throwAndDrawDeck(this.selectedCard);
      this.selectedCard = [];
      if (typeof result == "string") {
        setTimeout(() => alert(result), 1000);
      }
    },
    async onClickDiscard() {
      this.$refs.boardSurface.resetSelect();
      const result = await this.game.throwAndDrawDiscard(this.selectedCard);
      this.selectedCard = [];
      if (typeof result == "string") {
        setTimeout(() => alert(result), 1000);
      }
    },
    selectCard(selectedCard) {
      this.selectedCard = selectedCard;
    },
  },
};
</script>

<style lang="scss">
.play-game {
  height: 100%;
}
</style>