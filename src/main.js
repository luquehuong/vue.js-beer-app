import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faSearch, faShoppingCart, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faEdit, faSearch, faShoppingCart, faTimes, faPlus, faMinus)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(Vuex)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
