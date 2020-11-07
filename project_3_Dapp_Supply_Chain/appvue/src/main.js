import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

Vue.config.productionTip = false

App.methods.eth_metamask_sts(true);
console.log("----->" + App.data.farmer_name);

var vm = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

window.vm = vm;