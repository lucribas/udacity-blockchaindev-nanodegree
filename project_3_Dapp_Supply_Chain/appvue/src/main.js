import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTour from 'vue-tour'
import "@openfonts/luckiest-guy_latin";


require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

Vue.config.productionTip = false

// App.methods.eth_metamask_sts(true);
// console.log("----->" + App.data.farmer_name);

var vm = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

window.vm = vm;


// References
// window.vm.$children[0].Web3app  -> Web3App obj

// window.vm.$children[0].$refs    -> html refs to submodules

// window.vm.$children[0]. (methods and vars)
// ex: window.vm.$children[0].user_acc
// ex: window.vm.$children[0].methods.