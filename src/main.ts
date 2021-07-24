import { createApp } from 'vue'
import App from './App.vue'
import './plugins/registerServiceWorker'
import router from './plugins/router'
import store from './plugins/store'

import "./firebase";
import { Quasar } from 'quasar'
import quasarUserOptions from './plugins/quasar-user-options'

const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router);

app.mixin({
  methods: {
    routeTo(name: string, params = {}) {
      this.$router.push({ name, params });
    }
  }
})


app.mount('#app');
