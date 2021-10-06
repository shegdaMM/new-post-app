import router from '../router/index';
import axios from 'axios';
import api from '../services/auth.js';
const API_URL = process.env.VUE_APP_URL;

export default {
    state: {
        // for auth
        access_token: localStorage.getItem('token') || '',
        loggedInUser: null,
        isAuthenticated: false
    },
    getters: {
        // for auth
        access_token (state) {
          return state.access_token;
        },
        isAuthenticated (state) {
          return state.isAuthenticated;
        },
        loggedInUser: ({ loggedInUser }) => loggedInUser
    },
    mutations: {
        // for auth
        setAccessToken (state, accessToken) {
            state.access_token = accessToken;
        },
        setLoggedInUser (state, user) {
            state.loggedInUser = null;
            state.loggedInUser = user;

            state.isAuthenticated = null;
            state.isAuthenticated = true;
        },
        clearUserData (state) {
            state.access_token = '';
            state.loggedInUser = {};
            state.isAuthenticated = false;
        }
    },
    actions: {
        logIn: async ({ commit, dispatch }, payload) => {
          commit('onloadProcess');
          const Url = `${API_URL}/auth`;
          try {
            await axios.post(Url, payload).then(response => {
              if (response.status === 200) {
                commit('setAccessToken', response.data.token);
                localStorage.setItem('token', response.data.token);
                dispatch('fetchUser');
                api();
                dispatch('infoNotify', { message: 'You are autorizeited', place: 'auth' });
                router.push({ path: '/' });
              }
            });
          } catch (error) {
            console.log(error);
            const err = JSON.parse(error.request.response);
            if (Array.isArray(err.error)) {
              for (let i = 0; i < err.error.length; i++) {
                const el = err.error[i];
                dispatch('errorNotify', { message: el.message, place: 'auth' });
              }
            } else {
                commit('AuthErrorMessage', err.error);
                dispatch('errorNotify', { message: err.error, place: 'auth' });
              }
            }
          commit('onloadProcess');
        },
        logOut: async ({ commit, dispatch }) => {
          commit('clearUserData');
          localStorage.setItem('token', null);
          // eslint-disable-next-line dot-notation
          delete axios.defaults.headers.common['Authorization'];
          api();
          dispatch('successNotify', { message: 'You are unauthorized', place: 'auth' });
          router.push({ path: '/' });
        },
        fetchUser: async ({ commit, dispatch }) => {
          const Url = `${API_URL}/auth/user`;
          try {
            await axios.get(Url).then(response => {
              if (response.status === 200) {
                commit('setLoggedInUser', response.data);
              }
            });
          } catch (error) {
            // error
            dispatch('errorNotify', { message: error, place: 'auth' });
          }
        }
      }
};
