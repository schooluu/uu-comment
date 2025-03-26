import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

<<<<<<< HEAD
//测试测试这有错误的体积211111
=======
//测试测试这有错误的体积
>>>>>>> 42ebbfdee69d5564703e89b07a4132b46d53a193
