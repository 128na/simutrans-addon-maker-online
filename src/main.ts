import { createApp } from 'vue'
import App from './App.vue'
import './plugins/registerServiceWorker'
import router from './plugins/router'
import store from './plugins/store'

import "./firebase";
import { Quasar, useQuasar } from 'quasar'
import quasarUserOptions from './plugins/quasar-user-options'
import deviceConfig from './services/deviceConfig'

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


app.mixin({
  data() {
    return {
      $q: null,
    };
  },
  created() {
    const $q = useQuasar();
    this.$q = $q;

    this.$q.dark.set(deviceConfig.darkMode.get());
  },
  computed: {
    isDarkTheme() {
      return this.$q.dark.isActive;
    },
  },
  methods: {
    toggleTheme() {
      this.$q.dark.toggle();
      deviceConfig.darkMode.set(this.isDarkTheme);
    },
  },
})


app.mount('#app');
