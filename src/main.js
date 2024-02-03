import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as mdi from '@mdi/font/css/materialdesignicons.css'
// import "@/utils/mathjax"; // 必须在引入mathjax前引入mathjax的配置文件
// import "mathjax/es5/tex-mml-chtml"; // 使用 tex-mml-chtml

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

createApp(App).use(router).use(vuetify).mount('#app')

