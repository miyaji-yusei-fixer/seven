<template>
  <v-card class="field">
    <v-row>
      <v-col class="card" cols="1" v-for="card in hands" :key="`${card}`">
        <card-back />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CardBack from "@/components/common/CardBack.vue";
export default {
  props: {
    hands: {
      type: Number,
      required: true,
    },
  },
  components: { CardBack },
};
</script>

<style>
.card {
  padding: 0;
}
.field {
  padding: 12px 0;
}
.hands {
  padding: 0 12px;
}
</style>