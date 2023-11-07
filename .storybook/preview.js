import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);
const vuetify = new Vuetify({})

/** @type { import('@storybook/vue').Preview } */
export const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (story, context) => {
    const wrapped = story(context)
    return Vue.extend({
      vuetify,
      components: { wrapped },
      template: `
          <v-app>
            <v-container fluid>
              <wrapped />
            </v-container>
          </v-app>
        `
    })
  },
]
