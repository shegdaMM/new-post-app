import axios from 'axios';
// import router from '../router/index';

const API_URL = process.env.VUE_APP_URL;

export default {
    state: {
        commentAlert: null,
        comments: []
    },
    getters: {
        comments (state) {
            return state.comments;
        }
    },
    mutations: {
        // create tree as object in object (not use)
        setCurrentCommentList (state, list) {
            if (list) {
                state.currentCommentList = list;
                /* const let = {};
                for (const comm of Object.values(obj)) {
                    const parrent = comm.comment.followedCommentID;
                    if (!parrent) {
                        tree[comm.comment._id] = comm;
                    } else {
                        obj[parrent].childs[comm.comment._id] = comm;
                        if (tree[parrent]) {
                            tree[parrent] = obj[parrent];
                        }
                    }
                }
                console.log(tree);
                state.currentCommentList = tree;
                */
            } else {
                state.currentCommentList = '';
            }
        }, // object in array
        setCurrentCommentList1 (state, list) {
            state.comments = [];
            let comment;
            const comments = {};
            let tmpComment;

            for (let i = 0, len = list.length; i < len; i++) {
                comment = list[i];
                comment.children = [];
                comments[comment._id] = comment;
            }

            for (var id in comments) {
                // eslint-disable-next-line no-prototype-builtins
                if (!comments.hasOwnProperty(id)) {
                    continue;
                }
                tmpComment = comments[id];
                if (tmpComment.followedCommentID) {
                    comments[tmpComment.followedCommentID].children.push(tmpComment);
                } else {
                    state.comments.push(tmpComment);
                }
            }
        }
    },
    actions: {
        createComment: async ({ commit, dispatch }, payload) => {
            // commit('onloadProcess');
            const Url = `${API_URL}/comments/post/${payload.postID}`;
            const data = {
                text: payload.text
            };
            if (payload.followedCommentID) {
                data.followedCommentID = payload.followedCommentID;
            }
            try {
                await axios.post(Url, data).then(response => {
                    if (response.status === 200) {
                        // not work something
                    }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'comment' });
            }
            // commit('onloadProcess');
        },
        getCommentsByPost: async ({ commit, dispatch }, payload) => {
            // commit('onloadProcess');
            const url = `${API_URL}/comments/post/${payload.postID}`;
            try {
                await axios.get(url).then(response => {
                    if (response.status === 200) {
                        commit('setCurrentCommentList1', response.data);
                    }
                });
            } catch (error) {
                if (payload) {
                    dispatch('errorNotify', { message: error, place: 'comment' });
                }
            } finally {
               // commit('onloadProcess');
            }
        },
        clearCommentsByPost: ({ commit, dispatch }, payload) => {
            commit('setCurrentCommentList');
        },
        likeToComment: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            const Url = `${API_URL}/comments/like/${payload.id}`;
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
                dispatch('errorNotify', { message: 'You not add/remove like<br> to this comment!', place: 'comment' });
            }
            return resultStatus;
        },
        updateComment: async ({ commit, dispatch }, payload) => {
            // commit('onloadProcess');
            const Url = `${API_URL}/comments/${payload.id}`;
            const send = {
                text: payload.text || ''
            };
            try {
                await axios.patch(Url, send).then(response => {
                    if (response.status === 200) {
                        dispatch('successNotify', { message: 'Updated comment', place: 'comment' });
                    }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'comment' });
            }
           // commit('onloadProcess');
        },
        deleteComment: async ({ commit, dispatch }, payload) => {
            let resultStatus = false;
            // commit('onloadProcess');
            const Url = `${API_URL}/comments/${payload.id}`;
            try {
                await axios.delete(Url).then(response => {
                  if (response.status === 200) {
                    resultStatus = true;
                    dispatch('successNotify', { message: 'You are deleted comment', place: 'comment' });
                  }
                });
            } catch (error) {
                dispatch('errorNotify', { message: error, place: 'comment' });
            }
            // commit('onloadProcess');
            return resultStatus;
        }
    }
};
