// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import { XHeader,XButton } from 'vux'
import Page from '@/views/components/page.vue'
import baseMixin from "./baseMixin";
import 'flex.css'

FastClick.attach(document.body)


Vue.config.productionTip = false
Vue.component('x-header',XHeader);
Vue.component('x-button',XButton);
Vue.component('page',Page)
Vue.mixin(baseMixin)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
