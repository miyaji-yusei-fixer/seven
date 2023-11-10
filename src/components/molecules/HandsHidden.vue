<template>
  <v-card flat class="field" color="rgba(0,0,0,0)">
    <v-row class="hands">
      <v-col
        cols="1"
        v-for="(card, i) in hands"
        :key="`${card}`"
        :class="classes(i)"
      >
        <card-back />
      </v-col>
    </v-row>
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

<style>
.card {
  padding: 0;
}
.card-selected {
  transform: translateY(-24px);
}
.field {
  padding: 12px;
}
.hands {
  padding: 0 12px;
  margin-top: 12px;
}
</style>