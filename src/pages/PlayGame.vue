<template>
  <v-container class="play-game green" fluid>
    <v-app-bar dark color="green lighten-1">
      <v-btn v-if="phase == 'finished'" outlined @click="gameResultDialog = true">Result</v-btn>
      <v-toolbar-title>{{
        phase == "finished" ? "" : `Turn: ${turn}`
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
    <v-dialog v-model="gameResultDialog" max-width="400px">
      <v-card
        v-if="handsTotal(game.playerHands) < handsTotal(game.enemyHands)"
        color="blue-grey lighten-5"
      >
        <v-icon size="600%">mdi-crown</v-icon>
        <v-card-text class="text-h3 font-weight-bold"> You Win!</v-card-text>
        <v-card-text class="text-h4">
          <span class="green--text">{{ handsTotal(game.playerHands) }}</span>
          <span class="green--text">({{ game.playerHands.length }})</span>
          ：
          <span class="red--text">{{ handsTotal(game.enemyHands) }}</span>
          <span class="red--text">({{ game.enemyHands.length }})</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="new-game-button"
            outlined
            x-large
            color="green"
            @click="newGameDialog = true"
          >
            <v-icon> mdi-refresh </v-icon>
            もう一度
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else color="blue-grey lighten-5">
        <v-icon size="600%">mdi-emoticon-cry</v-icon>
        <v-card-text class="text-h3 font-weight-bold"> You Lose...</v-card-text>
        <v-card-text class="text-h4">
          <span class="red--text">{{ handsTotal(game.playerHands) }}</span>
          <span class="red--text">({{ game.playerHands.length }})</span>
          ：
          <span class="green--text">{{ handsTotal(game.enemyHands) }}</span>
          <span class="green--text">({{ game.enemyHands.length }})</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="new-game-button"
            outlined
            x-large
            color="green"
            @click="newGameDialog = true"
          >
            <v-icon> mdi-refresh </v-icon>
            もう一度
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                @click="newGame('2')"
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
                color="amber"
                @click="newGame('3')"
              >
                上級
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
    gameResultDialog: false,
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
      this.gameResultDialog = false;
    },
    async onClickDeck() {
      this.$refs.boardSurface.resetSelect();
      const result = await this.game.throwAndDrawDeck(this.selectedCard);
      this.selectedCard = [];
      if (typeof result == "string") {
        setTimeout(() => {
          this.gameResultDialog = true;
        }, 1000);
      }
    },
    async onClickDiscard() {
      this.$refs.boardSurface.resetSelect();
      const result = await this.game.throwAndDrawDiscard(this.selectedCard);
      this.selectedCard = [];
      if (typeof result == "string") {
        setTimeout(() => {
          this.gameResultDialog = true;
        }, 1000);
      }
    },
    selectCard(selectedCard) {
      this.selectedCard = selectedCard;
    },
    handsTotal(hands) {
      const index = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "x",
        "j",
        "q",
        "k",
      ];
      return hands
        .map((mark) => index.indexOf(mark[1]) + 1)
        .reduce(function (sum, element) {
          return sum + element;
        }, 0);
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