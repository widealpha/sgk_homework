import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import SearchInfo from "./components/SearchInfo";
import GroupInfo from "./components/GroupInfo";

Vue.config.productionTip = true
Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/searchInfo', component: SearchInfo},
        {path: '/groupInfo', component: GroupInfo},
    ]
})

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
