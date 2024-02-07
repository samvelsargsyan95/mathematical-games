import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import LeftPart from '@/components/parts/LeftPart'
import RightPart from '@/components/parts/RightPart'

Vue.component('LeftPart', LeftPart)
Vue.component('RightPart', RightPart)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
