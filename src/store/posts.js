import axios from 'axios';
import router from '../router/index';

const API_URL = process.env.VUE_APP_URL;

const notifyBody = (message, type) => {
    return { message: message, place: 'post', type: type };
};

// magic strings
const postsUrl = `${API_URL}/posts`;
const postByIdUrl = (id) => {
    return `${API_URL}/posts/${id}`;
};
const postImageUpdateById = (id) => {
    return `${API_URL}/posts/upload/${id}`;
};
const postLikeSendById = (id) => {
    return `${API_URL}/posts/like/${id}`;
};

const postListUrl = (payload) => {
    const params = Object.entries(payload);
    const url = new URL(`${API_URL}/posts`);
    params.forEach((param) => {
        if (param[1]) {
            url.searchParams.set(param[0], param[1]);
        }
    });
    return url.toString();
};

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
            try {
                await axios.get(postByIdUrl(payload.id)).then(response => {
                    if (response.status === 200) {
                      commit('setPostById', response.data);
                    }
                  });
                } catch (error) {
                  if (payload.id) {
                    dispatch('notify', notifyBody(error, 'error'));
                  }
                } finally {
                    commit('onloadProcess');
                }
        },
        removePostById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            try {
                await axios.delete(postByIdUrl(payload.id)).then(response => {
                  if (response.status === 200) {
                    commit('deletePostById');
                    dispatch('notify', notifyBody('You remove selected post', 'success'));

                    router.push({ path: '/posts' });
                  }
                });
              } catch (error) {
                dispatch('notify', notifyBody(error, 'error'));
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
            try {
                await axios({
                    method: 'put',
                    url: postImageUpdateById(payload.id),
                    data: payload.image,
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resultStatus = response.data.image;
                    dispatch('notify', notifyBody('You update image for this post!', 'success'));
                });
            } catch (error) {
                resultStatus = false;
                dispatch('notify', notifyBody('You not update post image!', 'error'));
            } finally {
                commit('onloadProcess');
            }
            return resultStatus;
        },
        likeToPost: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            try {
                await axios({
                    method: 'put',
                    url: postLikeSendById(payload.id)
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
            /* let isAdd = false;
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
            */
            try {
                await axios.get(postListUrl(payload)).then(response => {
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
                    dispatch('notify', notifyBody(error, 'error'));
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
            try {
                await axios.post(postsUrl, payload).then(response => {
                    if (response.status === 200) {
                        dispatch('notify', notifyBody('You create post', 'success'));
                        router.push({ path: `/post/${response.data._id}` });
                    }
                });
            } catch (error) {
                dispatch('notify', notifyBody(error, 'error'));
            }
            commit('onloadProcess');
        },
        patchCurrentPost: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const send = {
                title: payload.title || '',
                fullText: payload.fullText || '',
                description: payload.description || ''
            };
            try {
                await axios.patch(postByIdUrl(payload.id), send).then(response => {
                    if (response.status === 200) {
                        commit('updateCurrentPost', response.data);
                        dispatch('notify', notifyBody('You update post', 'success'));
                        router.push({ path: `/post/${response.data._id}` });
                    }
                });
            } catch (error) {
                dispatch('notify', notifyBody(error, 'error'));
            }
            commit('onloadProcess');
        }
    }
};
