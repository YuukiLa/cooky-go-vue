import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import checkPermission from './utils/permission'
import hasRole from './mixins/hasRole'
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})
Vue.mixin(hasRole)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.directive('hasRule', {
  bind(el, binding, vnode) {
    let rules = store.getters.rules
    if (!checkPermission(binding.value)) {
      if (!el.parentNode) {
        el.style.display = 'none'
      } else {
        el.parentNode.removeChild(el)
      }
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
