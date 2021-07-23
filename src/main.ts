import { createApp } from 'vue'
import App from './App.vue'
import './plugins/registerServiceWorker'
import router from './plugins/router'
import store from './plugins/store'
import fontawesome from "./plugins/fontawesome";

import "./firebase";
import { Quasar } from 'quasar'
import quasarUserOptions from './plugins/quasar-user-options'

const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router);

app.component('font-awesome-icon', fontawesome);

app.mount('#app');
