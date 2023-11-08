<template>
  <v-card flat class="field" :disabled="isDisabled" color="rgba(0,0,0,0)">
    <v-row class="hands">
      <v-col cols="6" class="relative">
        <card-back  @onClick="onClickDeck"/>
        <v-chip class="absolute" >{{ deckSheets }}</v-chip>
      </v-col>
      <v-col cols="6" class="relative">
        <card :mark="discard" @onClick="onClickDiscard" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Card from "@/components/common/Card.vue";
import CardBack from "@/components/common/CardBack.vue";
import { marks } from "@/utils/mark/markUtil";

export default {
  components: { Card, CardBack },
  props: {
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
    isDisabled: {
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
  },
};
</script>

<style>
.relative {
  text-align: -webkit-center;
  height: fit-content;
  position: relative;
  padding: 0;
}
.absolute {
  width: min-content;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.field {
  padding: 12px 0;
  width: -webkit-fill-available;
}
.hands {
  padding: 0 12px;
}
</style>