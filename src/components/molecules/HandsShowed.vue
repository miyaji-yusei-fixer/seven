<template>
  <v-card flat class="field" :disabled="isDisabled" color="rgba(0,0,0,0)">
    <transition-group
      tag="div"
      name="card"
      class="row hands"
      @enter="onEnter"
      @leave="onLeave"
    >
      <v-col
        cols="1"
        v-for="(mark, i) in hands"
        :key="`${mark}`"
        :class="classes(i)"
      >
        <card
          :mark="mark"
          @onClick="selectCard(i)"
          @resetSelect="resetSelect"
        />
      </v-col>
    </transition-group>
  </v-card>
</template>

<script>
import Card from "@/components/common/Card.vue";
import { marks } from "@/utils/mark/markUtil";
import { flyEnter, flyLeave } from "@/utils/animation/cardFly";

export default {
  components: { Card },
  data() {
    return {
      selected: [],
    };
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    // 引いたカードがどこから来たか（"deck" / "discard"）。enter アニメの起点に使う
    drawSource: {
      type: String,
      default: "deck",
    },
    hands: {
      type: Array,
      required: true,
      validator: function (array) {
        return array.some((value) => marks.indexOf(value) !== -1);
      },
    },
  },
  methods: {
    isSelected(index) {
      return this.selected.includes(index);
    },
    classes(index) {
      return {
        card: true,
        "card-selected": this.isSelected(index),
      };
    },
    selectCard(index) {
      if (this.selected.includes(index)) {
        this.resetSelect();
        this.$emit("selectCard", this.selected);
      } else {
        const matchNumber = this.hands.filter(
          (hand) => hand.charAt(1) == this.hands[index].charAt(1)
        );
        this.selected = matchNumber.map((mark) => this.hands.indexOf(mark));
        this.$emit("selectCard", matchNumber);
      }
    },
    resetSelect() {
      this.selected = [];
    },
    onEnter(el, done) {
      const selector =
        this.drawSource === "discard" ? ".discard-pile" : ".deck-pile";
      flyEnter(el, done, selector);
    },
    onLeave(el, done) {
      flyLeave(el, done, ".discard-pile");
    },
  },
};
</script>

<style lang="scss">
.card {
  padding: 0;
}
.card-selected {
  transform: translateY(-24px);
  transition: transform 0.15s ease-out;
}
// 案B: 並び替え（枚数変化・ソート）時の横スライド
.card-move {
  transition: transform 0.45s ease;
}
.card-leave-active {
  // JS フック(flyLeave)が position:fixed で制御するため z-index のみ確保
  z-index: 10;
}
.field {
  padding-bottom: 12px;
}
.hands {
  padding: 0 12px;
  margin-top: 12px;
}
</style>