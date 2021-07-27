import { createApp } from 'vue'
import App from './App.vue'
import './plugins/registerServiceWorker'
import router from './plugins/router'
import store from './plugins/store'
import './plugins/web-vital';

import "./firebase";
import { Quasar } from 'quasar'
import quasarUserOptions from './plugins/quasar-user-options'
import { globalMixin } from './mixins/index';

const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router);

app.mixin(globalMixin);

app.mount('#app');
