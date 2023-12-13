<template>
  <v-app id="app">
    <header>
      <v-app-bar dark color="green darken-2">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Seven</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        dark
        color="green darken-2"
      >
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item @click="toNewGame('/')">
              <v-list-item-title>ニューゲーム</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toNewGame('/about')">
              <v-list-item-title>遊び方</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toNewGame('/tutorial')">
              <v-list-item-title>チュートリアル</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template v-slot:append>
          <p class="white--text">version: {{ version }}</p>
          <p>
            <a
              class="white--text"
              href="https://github.com/miyaji-yusei-fixer/seven"
              >©2023 Miyaji Yusei
            </a>
          </p>
        </template>
      </v-navigation-drawer>
    </header>
    <router-view />
  </v-app>
</template>

<script>
import settings from "../package.json";
export default {
  data() {
    return {
      drawer: false,
      version: settings.version,
    };
  },
  methods: {
    toNewGame(path) {
      if (this.$route.path == path) {
        location.reload();
      } else {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
