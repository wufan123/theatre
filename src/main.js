import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import { XHeader,XButton } from 'vux'
import Page from '@/views/components/page.vue'
import store from './store'
import baseMixin from "./util/baseMixin";
import 'flex.css'
import  { ToastPlugin,ConfirmPlugin} from 'vux'


FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.component('x-header',XHeader);
Vue.component('x-button',XButton);
Vue.component('page',Page);
Vue.mixin(baseMixin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
