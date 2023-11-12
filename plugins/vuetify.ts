import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components';
import * as directives from "vuetify/directives";
import VueTablerIcons from "vue-tabler-icons";

// import "@/assets/scss/style.scss";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
  });
  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.use(VueTablerIcons);
});
