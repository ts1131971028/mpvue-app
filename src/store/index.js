import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  isAuthenticated : false,
  user : null,
  openId: '',
  lessonInfo: null
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
