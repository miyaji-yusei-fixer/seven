<template>
  <v-container>
    <board-surface v-bind="props"></board-surface>
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
  }),
  computed: {
    props() {
      return {
        playerHands: this.game.playerHands,
        hiddenHands: this.game.enemyHands.length,
        deckSheets: this.game.deck.length,
        discard: this.game.discard,
      };
    },
  },
  created() {
    // console.log(this.game.deck);
    // console.log(this.game.enemyHands);
    // console.log(this.game.playerHands);
  },
};
</script>
