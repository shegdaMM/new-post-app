import axios from 'axios';
import store from '../store';
import { simplifyObject } from '../utils/transform';

const API_URL = process.env.VUE_APP_URL;
const urlAllUsers = `${API_URL}/users?limit=0`;

const userUrl = (id) => {
    return `${API_URL}/users/${id}`;
};

export default class UserServices {
    static users = new Map();

    static async getUserById (id) {
        const userData = await UserServices.userFromMap(id);
        return userData;
    }

    static async userFromMap (id) {
        let result = null;
        // why if (!UserServices.users.size) allways true?
        if (UserServices.users.size === '0') {
            await UserServices.allUsersToMap();
            console.log(UserServices.users.size);
        }

        result = UserServices.getCurrentUser(id);
        if (result) {
            return result;
        }
    }

    static async allUsersToMap () {
        try {
            const usersArray = (await axios.get(urlAllUsers)).data.data;
            usersArray.forEach(user => {
                UserServices.users.set(user._id, simplifyObject(user, ['name', 'email']));
            });
        } catch (error) {
            store.dispatch('errorNotify', error);
        }
    }

    static async getCurrentUser (id) {
        if (!UserServices.users.has(id)) {
            try {
                const user = (await axios.get(userUrl(id))).data;
                UserServices.users.set(id, simplifyObject(user, ['name', 'email']));
            } catch (error) {
                // not works any think, where user was deleted from server
            }
        }
        const result = UserServices.reduceUser(UserServices.users.get(id));
        return result || null;
    }

    // helpers
    static reduceUser (user) {
        return user?.name ? user?.name : user?.email;
    }

    static async getAllUsersObject () {
        if (UserServices.users.size === 0) {
            await UserServices.allUsersToMap();
        }
        return Object.fromEntries(UserServices.users);
    }
}
