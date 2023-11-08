<template>
  <v-card class="field" :disabled="isDisabled">
    <v-row class="hands">
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
    </v-row>
  </v-card>
</template>

<script>
import Card from "@/components/common/Card.vue";
import { marks } from "@/utils/mark/markUtil";

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
  },
};
</script>

<style>
.card {
  padding: 0;
}
.card-selected {
  transform: translateY(-24px);
}
.field {
  padding-bottom: 12px;
}
.hands {
  padding: 0 12px;
  margin-top: 12px;
}
</style>