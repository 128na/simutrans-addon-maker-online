import { createApp } from 'vue'
import App from './App.vue'
import './plugins/registerServiceWorker'
import router from './plugins/router'
import store from './plugins/store'
import fontawesome from "./plugins/fontawesome";

import "./firebase";

const app = createApp(App)
  .use(store)
  .use(router);

app.component('font-awesome-icon', fontawesome);

app.mount('#app');
