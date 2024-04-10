import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./plugins/router";
import vuetify from "./plugins/vuetify";
import mixins from "./plugins/mixins";

import { initFirebase } from "./plugins/firebase";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(vuetify);
app.mixin(mixins);
router.isReady().then(() => {
  initFirebase();
  app.mount("#app");
});
