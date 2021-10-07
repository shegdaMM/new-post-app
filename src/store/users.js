import router from '../router/index';
import axios from 'axios';
import UserNameMap from '../services/UserNameMap.js';

const API_URL = process.env.VUE_APP_URL;
// eslint-disable-next-line no-unused-vars
const IMG_URL = process.env.VUE_APP_IMG_URL;
export default {
    state: {
        currentUser: null,
        usersListSize: 0,
        currentUserList: [],
        userNameList: ''
    },
    getters: {
        currentUser (state) {
            return state.currentUser;
        },
        usersListSize (state) {
            return state.usersListSize;
        },
        currentUserList (state) {
            return state.currentUserList;
        },
        // map
        userNameList: (state) => (key) => {
            if (key && state.usersIDMap) {
              let name = state.usersIDMap.get(key);
              if (!name) { name = ''; }
              return name;
            }
        }
    },
    mutations: {
        // user
        setUserById (state, user) {
            if (user) {
                state.currentUser = user;
            }
        },
        deleteUserById (state) {
            state.currentUser = null;
        },
        updateCurrentUser (state, user) {
            if (user) {
                state.currentUser = user;
            }
        },
        setUsersListSize (state, count) {
            if (count) {
                state.usersListSize = count;
            }
        },
        setCurrentUsersList (state, list) {
            if (list) {
                state.currentUserList = list;
            }
        },
        removeUsersList (state) {
            state.currentUserList = [];
            state.usersListSize = 0;
        },
        setUserNameList (state, list) {
            if (list) {
                state.userNameList = list;
            }
        }
    },
    actions: {
        // user
        getUserById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            let result;
            const Url = `${API_URL}/users/${payload.id}`;
            try {
                await axios.get(Url).then(response => {
                  if (response.status === 200) {
                    commit('setUserById', response.data);
                    result = response.data;
                  }
                });
              } catch (error) {
                // error
                if (payload.id) {
                    // dispatch('errorNotify', { message: error, place: 'user' });
                }
              }
            commit('onloadProcess');
            return result;
        },
        removeUserById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
                const Url = `${API_URL}/users/${payload.id}`;
            try {
                await axios.delete(Url).then(response => {
                  if (response.status === 200) {
                    commit('deleteUserById');
                    dispatch('successNotify', { message: 'You remove your account', place: 'user' });
                    // remove from map
                    UserNameMap.removeUser(payload.id);
                    commit.clearUserData();
                    router.push({ path: '/' });
                  }
                });
              } catch (error) {
                dispatch('errorNotify', { message: error, place: 'user' });
              }
            commit('onloadProcess');
        }, // CROS problems...
        getCurrentUserAvatar: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            let result = null;
            const apiurl = `${IMG_URL}${payload.avatar}`;
            try {
                if (payload.avatar) {
                    const res = await fetch(apiurl, { method: 'HEAD' });
                    if (res.status !== 404) {
                        result = `${IMG_URL}${payload.avatar}`;
                    }
                }
            } catch (error) {
            }
            commit('onloadProcess');
            return result;
        },
        putCurrentUserAvatar: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            const Url = `${API_URL}/users/upload/${payload.id}`;
            try {
                await axios({
                    method: 'put',
                    url: Url,
                    data: payload.data,
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resultStatus = true;
                    commit('setUserById', response.data);
                    dispatch('successNotify', { message: 'You update your avatar', place: 'user' });
                });
            } catch (error) {
                resultStatus = false;
                dispatch('errorNotify', { message: 'You not update avatar', place: 'user' });
            }
            return resultStatus;
        },
        patchCurrentUser: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users/${payload._id}`;
            const send = {
                name: payload.name || '',
                extra_details: payload.extra_details || '',
                skills: payload.skills || '',
                profession: payload.profession || '',
                details: payload.details || ''
            };
            try {
                await axios.patch(Url, send).then(response => {
                    if (response.status === 200) {
                        commit('updateCurrentUser', response.data);
                        dispatch('successNotify', { message: 'You update your account', place: 'user' });
                    }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'user' });
            }
            commit('onloadProcess');
        },
        createCurentUser: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users`;
            try {
                await axios.post(Url, payload).then(response => {
                    if (response.status === 200) {
                        dispatch('successNotify', { message: 'You create new account <br> Please login in system', place: 'user' });
                        router.push({ path: '/login' });
                    }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'user' });
            }
            commit('onloadProcess');
        },
        getUsersList: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users?limit=${payload.limit}&skip=${payload.skip * payload.limit}`;
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                        commit('setUsersListSize', response.data.pagination.total);
                        commit('setCurrentUsersList', response.data.data);
                    }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'user' });
            }
            commit('onloadProcess');
        },
        clearUsersList: ({ commit, dispatch }, payload) => {
            commit('removeUsersList');
        },
        clearCurrentUser: ({ commit, dispatch }, payload) => {
            commit('deleteUserById');
        }, // api for users names
        getUserNameById: async ({ commit, dispatch }, payload) => {
            let result;
            if (payload) {
                result = await UserNameMap.getUserName(payload);
                commit('setUserNameList', result);
            } else {
                if (!UserNameMap.map) {
                   await UserNameMap.updateAllMap();
                }
                result = UserNameMap.map;
            }
            return result || '';
        }
    }
};
