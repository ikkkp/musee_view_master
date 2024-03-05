import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import Axios from '@/axios/axiosPlugin.js'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as mdi from '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  components,
  directives,
})
const app = createApp(App);
app.config.globalProperties.$Axios = Axios;

app.use(router).use(vuetify).mount('#app')

