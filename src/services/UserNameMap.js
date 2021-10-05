import axios from 'axios';
import store from '../store';

const API_URL = process.env.VUE_APP_URL;

export default class UserNameMap {
    static map = {};
    static badUserAccounts = {};

    static timer = setInterval(() => {
        localStorage.setItem('UserNameApp', UserNameMap.map);
    }, 600000)

    static async updateAllMap () {
        const Url = `${API_URL}/users?limit=0`;
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                        const list = response.data.data;
                        list.forEach(user => {
                            UserNameMap.map[user._id] = { name: user.name, email: user.email, update: Date.now() };
                        });
                    }
                    localStorage.setItem('UserNameApp', UserNameMap.map);
                });
            } catch (error) {
                store.commit('errorMessage', error);
        }
        return UserNameMap.map;
    };

    static async updateUser (id) {
        let result = '';
        const Url = `${API_URL}/users/${id}`;
        if (!(UserNameMap.badUserAccounts[id])) {
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                        const user = response.data;
                        UserNameMap.map[id] = { name: user.name, email: user.email, update: Date.now() };
                        result = user.name ? user.name : user.email;
                    }
                });
            } catch (e) {
                UserNameMap.badUserAccounts[id] = 'removed';
            }
        }
        return result;
    };

    static async getUserName (id) {
        if (!UserNameMap.map) {
            if (localStorage.getItem('UserNameApp')) {
                UserNameMap.map = JSON.parse(localStorage.getItem('UserNameApp'));
            } else {
                await UserNameMap.updateAllMap();
            }
        }
        let userName = '';
        if (id in UserNameMap.map) {
            const user = UserNameMap.map[id];
            // if we apdate user more 10 minuts
            if ((Date.now() - user.update) < 600000) {
                userName = user.name ? user.name : user.email;
            } else {
                userName = await UserNameMap.updateUser(id);
            }
        } else {
            userName = await UserNameMap.updateUser(id);
        }
        return userName;
    };

    static removeUser (id) {
        if (id) {
            delete UserNameMap.map[id];
        }
    }
};
