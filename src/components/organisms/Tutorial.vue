<template>
  <v-container class="play-game green" fluid>
    <board-surface
      ref="boardSurface"
      v-bind="props"
      @onClickDeck="onClickDeck"
      @onClickDiscard="onClickDiscard"
      @selectCard="selectCard"
    />
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="text-h5 justify-center">
          セブンのチュートリアル
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text
          style="white-space: pre-wrap; min-height: 200px"
          class="text-left"
          >{{ tutorialText[phase][page - 1] }}</v-card-text
        >
        <v-spacer></v-spacer>
        <v-pagination
          v-if="pageLength > 1"
          color="green"
          v-model="page"
          :length="pageLength"
          circle
        ></v-pagination>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark
            color="green"
            :disabled="pageLength != page"
            @click="cloaseDialog"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import BoardSurface from "@/components/organisms/BoardSurface.vue";
import { Tutorial } from "@/script/tutorial";
export default {
  components: { BoardSurface },
  name: "Tutorial",
  data: () => ({
    tutorial: new Tutorial(),
    dialog: true,
    section: 1,
    page: 1,
    tutorialText,
  }),
  computed: {
    props() {
      return {
        playerHands: this.tutorial.playerHands,
        hiddenHands: this.tutorial.enemyHands,
        deckSheets: this.tutorial.deck.length,
        discard: this.tutorial.discard[0],
        isDisabledDeck: this.tutorial.isDisabledDeck,
        isDisabledHands: this.tutorial.isDisabledHands,
      };
    },
    phase() {
      return this.tutorial.phase;
    },
    pageLength() {
      return tutorialText[this.phase].length;
    },
  },
  methods: {
    cloaseDialog() {
      this.dialog = false;
      this.page = 1;
      if (this.phase == 2) {
        setTimeout(() => {
          this.tutorial.nextStep();
          // 2重構造なので後で改修する
          setTimeout(() => {
            this.dialog = true;
            this.tutorial.isDisabledHands = false;
            this.tutorial.isDisabledDeck = true;
          }, 1000);
        }, 1000);
      } else if (this.phase == 5) {
        this.tutorial.nextStep();
        setTimeout(() => {
          this.dialog = true;
          this.tutorial.isDisabledHands = false;
          this.tutorial.isDisabledDeck = true;
        }, 1000);
      } else if (this.phase == 8) {
        setTimeout(() => {
          this.tutorial.nextStep();
          // 2重構造なので後で改修する
          setTimeout(() => {
            this.dialog = true;
            this.tutorial.isDisabledHands = false;
            this.tutorial.isDisabledDeck = true;
          }, 1000);
        }, 1000);
      }
    },
    nextStep() {
      this.tutorial.nextStep();
      this.dialog = true;
    },
    async onClickDeck() {
      switch (this.phase) {
        case 1:
          this.$refs.boardSurface.resetSelect();
          this.tutorial.isDisabledDeck = true;
          this.tutorial.playerHands = ["s1", "h3", "c3", "d8", "dx", "hq"];
          this.tutorial.discard = ["ck"].concat(this.tutorial.discard);
          this.tutorial.drawADeck(this.tutorial.playerHands);
          setTimeout(() => this.nextStep(), 1000);
          break;
        case 4:
          alert(
            "捨て札の♣Qと数字が同じ♥Qが手札にあります。\n捨て札から1枚引いてみましょう。"
          );
          break;
        case 7:
          this.$refs.boardSurface.resetSelect();
          this.tutorial.isDisabledDeck = true;
          this.tutorial.playerHands = ["s1", "d4"];
          this.tutorial.discard = ["h3"].concat(this.tutorial.discard);
          this.tutorial.drawADeck(this.tutorial.playerHands);
          setTimeout(() => this.nextStep(), 1000);
          break;
        case 9:
          alert("捨て札から♠2を引いてみましょう。");
          break;

        default:
          break;
      }
    },
    async onClickDiscard() {
      switch (this.phase) {
        case 1:
          alert("山札（真ん中左）から1枚取りましょう。");
          break;
        case 4:
          this.$refs.boardSurface.resetSelect();
          this.tutorial.isDisabledDeck = true;
          this.tutorial.playerHands = ["s1", "h3", "c3", "d8", "hq", "cq"];
          this.tutorial.discard.shift();
          setTimeout(() => this.nextStep(), 1000);
          break;
        case 7:
          alert(
            "山札から1枚引きましょう。\n手札が♠1, ♦4で合計が5なので、2以下のカードを引ければ勝ちです。"
          );
          break;
        case 9:
          this.$refs.boardSurface.resetSelect();
          this.tutorial.isDisabledDeck = true;
          this.tutorial.playerHands = ["s1", "d3", "s2"];
          this.tutorial.discard.shift();
          setTimeout(() => this.nextStep(), 1000);
          break;

        default:
          break;
      }
    },
    selectCard(selectedCard) {
      switch (this.phase) {
        case 0:
          if (selectedCard.includes("ck")) {
            this.nextStep();
          } else {
            this.$refs.boardSurface.resetSelect();
            alert("手札の中で一番数字が大きい♣Kを選んでみましょう。");
          }
          break;
        case 3:
          if (selectedCard.includes("hx")) {
            this.nextStep();
          } else {
            this.$refs.boardSurface.resetSelect();
            alert(
              "♥10と♦10を捨ててみましょう。\n同じ数字のカードは同時に捨てることができます。"
            );
          }
          break;
        case 6:
          if (selectedCard.includes("h3")) {
            this.nextStep();
          } else {
            this.$refs.boardSurface.resetSelect();
            alert("♥3と♣3を捨ててみましょう。");
          }
          break;
        case 9:
          if (selectedCard.includes("d4")) {
            this.tutorial.isDisabledHands = true;
            this.tutorial.isDisabledDeck = false;
          } else {
            this.$refs.boardSurface.resetSelect();
            alert(
              "終盤に相手が数字の小さいカードを捨てたらチャンスです。♦4を捨ててみましょう。"
            );
          }
          break;
      }
    },
  },
};
const tutorialText = [
  [
    "セブンは、手札を引いて捨ててを繰り返し、合計数が「7」以下になるのを目指すゲームです。",
    `【ディール】
    山札から自分に7枚、相手に7枚配られ、捨て札に1枚配置してスタートとなります。
    （相手の手札は見えませんが、ゲームを説明するためにオープンしています。）
    `,
    `【ターンの流れ】
    1. 手札から好きな札を捨てます。同じ数字のカードが複数枚ある場合、同時にすべて捨てることができます。
    2. 山札、もしくは捨て札の一番上から手札に一枚加えます。`,
    `まずは手札（一番下）の中で一番数字が大きい♣のKを選んでみましょう。`,
  ],
  ["次に、山札（真ん中左）から1枚取りましょう。"],
  [
    "これで手札の♣Kを捨て、山札から♥10を引くことができました。",
    `今の手札は♠1, ♥3, ♣3, ♦8, ♥10, ♦10, ♥Qなので、合計は47です。
7以下には程遠いのでターンを終了して、相手のターンに移ります。`,
  ],
  [
    `相手は♣qを捨て、山札から1枚引いたようです。
これで相手のターンが終わり、あなたのターンになります。`,
    `次は♥10と♦10を捨ててみましょう。
同じ数字のカードは同時に捨てることができます。`,
  ],
  [
    "捨て札の♣Qと数字が同じ♥Qが手札にあります。\n今度は捨て札から1枚引いてみましょう。",
  ],
  [
    `これで手札の♥10と♦10を捨て、捨て札から♣Qを引くことができました。
次のターンで♥Qと♣Qを同時に捨てることができます。
1枚捨てて1枚引かなければいけないので、同じ数字を同時に捨てることで手札を減らすことができます。`,
    `今の手札は♠1, ♥3, ♣3, ♦8, ♥Q, ♣Qなので、合計は39です。
まだまだ7より大きいので、同じように繰り返していきます。`,
  ],
  [
    "ターンを繰り返し、手札はお互い4枚になりました。",
    "次は♥3と♣3を捨ててみましょう。",
  ],
  [
    "山札から1枚引きましょう。\n手札が♠1, ♦4で合計が5なので、2以下のカードを引ければ勝ちです。",
  ],
  [
    "手札が♠1, ♦3, ♦4で合計が8なので、7以下になりませんでした。相手のターンになります。",
  ],
  [
    `相手は♠2, ♥2を捨て、山札から1枚引いたようです。
相手もまだ合計が7以下にならなかったようなので、あなたのターンになります。`,
    `終盤に相手が数字の小さいカードを捨てたらチャンスです。♦4を捨てて、捨て札の♠2を取ってみましょう。`,
  ],
  [
    `手札が♠1, ♦3, ♠2で合計が7以下になりました！あなたの勝利です！
ルールがわかったら、せひ左上のメニューからニューゲームを選択して遊んでみてください！`,
  ],
];
</script>

<style lang="scss">
.play-game {
  height: 100%;
}
</style>