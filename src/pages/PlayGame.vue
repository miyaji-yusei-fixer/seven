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
      <v-btn @click="newGameDialog = true" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>

    <BoardSurface
      ref="boardSurface"
      v-bind="props"
      @onClickDeck="onClickDeck"
      @onClickDiscard="onClickDiscard"
      @selectCard="selectCard"
      :isDisabledDeck="isDisabledDeck"
      :isDisabledHands="phase != 'player'"
    />
    <v-dialog v-model="newGameDialog" max-width="500px">
      <v-card color="blue-grey lighten-5">
        <v-card-text>
          <v-row class="pt-4">
            <v-col>
              <v-btn
                class="new-game-button"
                outlined
                x-large
                color="green"
                @click="newGame(1)"
              >
                初級
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                class="new-game-button"
                outlined
                x-large
                color="amber"
                @click="newGame(2)"
              >
                中級
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                class="new-game-button"
                outlined
                x-large
                color="orange"
                @click="newGame()"
              >
                ランダム
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                class="new-game-button"
                outlined
                @click="$router.push('/tutorial')"
              >
                チュートリアル
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="new-game-button"
                outlined
                @click="$router.push('/about')"
              >
                遊び方
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    newGameDialog: true,
  }),
  computed: {
    props() {
      return {
        playerHands: this.game.playerHands,
        hiddenHands:
          this.game.phase != "finished"
            ? this.game.enemyHands.length
            : this.game.enemyHands,
        // デバッグ：相手の手札を表示する時
        // hiddenHands: this.game.enemyHands,
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
    newGame(level) {
      this.game = new Game(level);
      this.newGameDialog = false;
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
.new-game-button {
  width: 100%;
  border-width: 2px;
}
</style>