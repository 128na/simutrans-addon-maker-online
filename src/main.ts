import { createApp } from 'vue'
import App from './App.vue'
import './plugins/registerServiceWorker'
import router from './plugins/router'
import store from './plugins/store'

import "./firebase";
import { Quasar, useQuasar } from 'quasar'
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


app.mixin({
  data() {
    return {
      $q: null,
    };
  },
  created() {
    const $q = useQuasar();
    this.$q = $q;

    const dark = localStorage.getItem("theme.dark");
    this.$q.dark.set(dark === "1" ? true : false);
  },
  computed: {
    isDarkTheme() {
      return this.$q.dark.isActive;
    },
  },
  methods: {
    toggleTheme() {
      this.$q.dark.toggle();
      localStorage.setItem("theme.dark", this.isDarkTheme ? "1" : "0");
    },
  },
})


app.mount('#app');
