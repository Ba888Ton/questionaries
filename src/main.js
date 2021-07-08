import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import { ValidationProvider } from 'vee-validate';
import ElementUI from 'element-ui';
// import { Button, Input, Progress, OptionGroup, Option, Steps, Step } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
// Vue.use(Button)
// Vue.use(Input)
// Vue.use(Progress)
// Vue.use(OptionGroup)
// Vue.use(Option)
// Vue.use(Steps)
// Vue.use(Step)
Vue.use(ElementUI);

// Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
