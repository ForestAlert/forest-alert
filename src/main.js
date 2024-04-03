import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./plugins/router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { initFirebase } from "./plugins/firebase";

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

app.use(router);
app.use(pinia);
app.use(vuetify);

router.isReady().then(() => {
  initFirebase();
  app.mount("#app");
});