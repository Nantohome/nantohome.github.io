import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faSignOutAlt, faUser, faAngleLeft, faAngleRight, faBell, faBellSlash, faChartBar, faUserCog, faShieldAlt, faQuestion} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands';

import 'normalize.css';
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/alert.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/notification.css';
import './style.css';

import ToggleSwitch from 'vuejs-toggle-switch'
Vue.use(ToggleSwitch);

library.add(faSignOutAlt, faUser, brands, faAngleLeft, faAngleRight, faBell, faBellSlash, faChartBar, faUserCog, faShieldAlt, faQuestion);

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
