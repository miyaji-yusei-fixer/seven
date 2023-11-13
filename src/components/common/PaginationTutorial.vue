<template>
  <v-container d-flex justify-center v-if="pageLength > 1">
    <div v-for="i in pageLength" v-bind:key="i">
      <v-icon class="ma-2" color="green" size="small" @click="clickPage(i)">
        {{
          i == page
            ? "mdi-checkbox-blank-circle"
            : "mdi-checkbox-blank-circle-outline"
        }}
      </v-icon>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    // Vue2→3は'value→modelValue ドキュメントがごっちゃになっててめっちゃ時間かかった'
    value: {
      type: Number,
      required: true,
    },
    pageLength: {
      type: Number,
      required: true,
    },
  },
  computed: {
    page: {
      get() {
        return this.value;
      },
      set(value) {
        // Vue2→3は'input→update:modelValue ドキュメントがごっちゃになっててめっちゃ時間かかった'
        this.$emit("input", value);
      },
    },
  },
  methods: {
    clickPage(i) {
      this.page = i;
    },
  },
};
</script>
