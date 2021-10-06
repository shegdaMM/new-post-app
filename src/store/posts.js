import axios from 'axios';
import router from '../router/index';

const API_URL = process.env.VUE_APP_URL;
// const IMG_URL = process.env.VUE_APP_IMG_URL;

export default {
    state: {
        currentPost: null,
        postsListSize: 0,
        currentPostsList: [],
        fullPostsList: []
    },
    getters: {
        currentPost (state) {
            return state.currentPost;
        },
        fullPostsList (state) {
            return state.fullPostsList;
        },
        postsListSize (state) {
            return state.postsListSize;
        },
        currentPostsList (state) {
            return state.currentPostsList;
        }
    },
    mutations: {
        setPostById (state, post) {
            state.currentPost = null;
            if (post) {
                state.currentPost = post;
            }
        },
        deletePostById (state) {
            state.currentPost = null;
        },
        setPostsListSize (state, count) {
            if (count) {
                state.postsListSize = count;
            }
        },
        setCurrentPostsList (state, list) {
            if (list) {
                state.currentPostsList = list;
            }
        },
        setFullPostsList (state, list) {
            if (list) {
                state.fullPostsList = list;
            }
        },
        removePostsList (state) {
            state.currentPostsList = [];
            state.fullPostsList = [];
            state.postsListSize = 0;
        },
        updateCurrentPost (state, post) {
            if (post) {
                state.currentPost = null;
                state.currentPost = post;
            }
        }
    },
    actions: {
        getPostById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/posts/${payload.id}`;
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                      commit('setPostById', response.data);
                    }
                  });
                } catch (error) {
                  if (payload.id) {
                    dispatch('errorNotify', { message: error, place: 'post' });
                  }
                } finally {
                    commit('onloadProcess');
                }
        },
        removePostById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
                const Url = `${API_URL}/posts/${payload.id}`;
            try {
                await axios.delete(Url).then(response => {
                  if (response.status === 200) {
                    commit('deletePostById');
                    dispatch('successNotify', { message: 'You remove selected post', place: 'post' });
                    router.push({ path: '/posts' });
                  }
                });
              } catch (error) {
                dispatch('errorNotify', { message: error, place: 'post' });
              } finally {
                commit('onloadProcess');
            }
        },
        clearCurrentPost: ({ commit, dispatch }, payload) => {
            commit('deletePostById');
        },
        updatePostImage: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            commit('onloadProcess');
            const Url = `${API_URL}/posts/upload/${payload.id}`;
            try {
                await axios({
                    method: 'put',
                    url: Url,
                    data: payload.image,
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resultStatus = response.data.image;
                    dispatch('successNotify', { message: 'You update image for this post!', place: 'post' });
                });
            } catch (error) {
                resultStatus = false;
                dispatch('errorNotify', { message: 'You not update post image!', place: 'post' });
            } finally {
                commit('onloadProcess');
            }
            return resultStatus;
        },
        likeToPost: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            const Url = `${API_URL}/posts/like/${payload.id}`;
            try {
                await axios({
                    method: 'put',
                    url: Url
                })
                .then(response => {
                    resultStatus = true;
                });
            } catch (error) {
                resultStatus = false;
            }
            return resultStatus;
        },
        getPostsList: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            let isAdd = false;
            let url = `${API_URL}/posts`;
            if (payload?.search) {
                url += `${isAdd ? '&' : '?'}search=${payload?.search}`;
                isAdd = true;
            }
            if (payload?.postedBy) {
                url += `${isAdd ? '&' : '?'}postedBy=${payload?.postedBy}`;
                isAdd = true;
            }
            url += `${isAdd ? '&' : '?'}limit=${payload?.limit || 0}&skip=${payload?.skip || 0}`;
            try {
                await axios.get(url).then(response => {
                    if (response.status === 200) {
                      commit('setPostsListSize', response.data.pagination.total);
                      if (payload.limit === 0) {
                        commit('setFullPostsList', response.data.data);
                      } else {
                        commit('setCurrentPostsList', response.data.data);
                      }
                    }
                  });
                } catch (error) {
                  // error
                  if (payload) {
                    dispatch('errorNotify', { message: error, place: 'post' });
                  }
            } finally {
                commit('onloadProcess');
            }
        },
        clearPostsList: ({ commit, dispatch }, payload) => {
            commit('removePostsList');
        }, // not realize
        createPost: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/posts`;
            try {
                await axios.post(Url, payload).then(response => {
                    if (response.status === 200) {
                        dispatch('successNotify', { message: 'You create post', place: 'post' });
                        router.push({ path: `/post/${response.data._id}` });
                    }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'post' });
            }
            commit('onloadProcess');
        },
        patchCurrentPost: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/posts/${payload._id}`;
            const send = {
                title: payload.title || '',
                fullText: payload.fullText || '',
                description: payload.description || ''
            };
            try {
                await axios.patch(Url, send).then(response => {
                    if (response.status === 200) {
                        commit('updateCurrentPost', response.data);
                        dispatch('successNotify', { message: 'You update post', place: 'post' });
                        router.push({ path: `/post/${response.data._id}` });
                    }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'post' });
            }
            commit('onloadProcess');
        }
    }
};
