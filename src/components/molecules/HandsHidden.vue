<template>
  <v-card flat class="field" color="rgba(0,0,0,0)">
    <transition-group tag="div" name="card" class="row hands">
      <v-col
        cols="1"
        v-for="(card, i) in hands"
        :key="`${card}`"
        :class="classes(i)"
      >
        <CardBack />
      </v-col>
    </transition-group>
  </v-card>
</template>

<script>
import CardBack from "@/components/common/CardBack.vue";
export default {
  components: { CardBack },
  props: {
    hands: {
      type: Number,
      required: true,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    classes(index) {
      return {
        card: true,
        "card-selected": this.selected.includes(index) || false,
      };
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
// 並び替え（枚数変化）時の横スライド
.card-move {
  transition: transform 0.45s ease;
}
// 相手カードの出現/退場フェード（回転コンテナ内のため CSS で完結）
.card-enter-active,
.card-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.card-enter,
.card-leave-to {
  opacity: 0;
  transform: translateY(-24px) scale(0.8);
}
.card-leave-active {
  position: absolute;
}
.field {
  padding: 12px;
}
.hands {
  padding: 0 12px;
  margin-top: 12px;
}
</style>