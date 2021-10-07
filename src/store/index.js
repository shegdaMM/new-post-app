import { createStore } from 'vuex';
// import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
// import router from '../router/index';
// import axios from 'axios';
import users from './users.js';
import auth from './auth.js';
import posts from './posts.js';
import comments from './comments.js';

// const API_URL = process.env.VUE_APP_URL;

export default createStore({
  plugins: [createPersistedState({ paths: ['auth'] })],
  // namespaced: true,
  state: {
    loadProcess: false,
    notify: null
  },
  getters: {
    loadProcess (state) {
      return state.loadProcess;
    },
    notify (state) {
      let result = null;
      if (state.notify?.message) {
        result = {
          message: state.notify?.message,
          type: state.notify?.type || 'error',
          place: state.notify?.place || 'all'
        };
      }
      return result;
    }
  },
  mutations: {
    // for loader component
    onloadProcess (state) {
      state.loadProcess = !state.loadProcess;
    },
    clearNotify ({ state }) {
      state.notify = null;
    },
    setNotify (state, payload) {
      if (payload?.message) {
        state.notify = payload;
      }
    }
  },
  actions: {
    notify: ({ commit }, payload) => {
      if (payload?.message) {
        const result = {};
        console.log(payload?.message);
        if (typeof payload?.message === 'string') {
          result.message = payload?.message;
        } else {
          result.message = payload?.message.message;
        }
        result.type = payload?.type;
        if (payload?.body?.place) {
          const validation = ['post', 'comment', 'user', 'auth'].indexOf(payload?.place) !== -1;
          if (validation) result.place = payload?.place;
        }
        commit('setNotify', result);
      }
    },
    // i not delete this actions, becose I refactoring only posts.js in vuex
    successNotify: ({ commit, dispatch }, payload) => {
      if (payload?.message) {
        const result = Object.assign({}, payload, { type: 'success' });
        dispatch('notify', result);
      } else {
        commit('setNotify', null);
      }
    },
    infoNotify: ({ commit, dispatch }, payload) => {
      if (payload?.message) {
        const result = Object.assign({}, payload, { type: 'info' });
        dispatch('notify', result);
      } else {
        commit('setNotify', null);
      }
    },
    warningNotify: ({ commit, dispatch }, payload) => {
      if (payload?.message) {
        const result = Object.assign({}, payload, { type: 'warning' });
        dispatch('notify', result);
      } else {
        commit('setNotify', null);
      }
    },
    errorNotify: ({ commit, dispatch }, payload) => {
      if (payload?.message) {
        const result = Object.assign({}, payload, { type: 'error' });
        dispatch('notify', result);
      } else {
        commit('setNotify', null);
      }
    }
  },
  modules: {
    users, auth, posts, comments
  }
});
