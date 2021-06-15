import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			token: "",
			username: "",
			avatar: "",
			phone: "",
			address: "",
			count: 0,
			money: 0,
			isLogin: 0,
			loginFlag: false,
		},
    mutations: {
			
		},
    actions: {}
})
export default store