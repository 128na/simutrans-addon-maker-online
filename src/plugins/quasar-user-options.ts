
import '@/styles/quasar.scss'
import lang from 'quasar/lang/ja.js'
import '@quasar/extras/material-icons/material-icons.css'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
  },
  lang: lang,
  extras: [
    'material-icons',
    'mdi-v5', // index.htmlにCDN追加が必要
  ]
}