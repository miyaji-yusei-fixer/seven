<template>
  <div id="app">
    <header>
      <v-app-bar dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Seven</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item @click="toNewGame('/seven')">
              <v-list-item-title>ニューゲーム</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toNewGame('/seven/about')">
              <v-list-item-title>遊び方</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    toNewGame(path) {
      console.log(path, this.$route.path);
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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
