import '@/styles/quasar.scss';
import '@quasar/extras/material-icons/material-icons.css';
import lang from 'quasar/lang/ja.js';
import { Notify } from 'quasar';

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ }
  },
  plugins: {
    Notify
  },
  lang: lang,
  extras: [
    'material-icons',
    'mdi-v5', // index.htmlにCDN追加が必要
  ],
}