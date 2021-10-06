<template>
    <div class="users-select-wrapper" v-if="usersFullList">
        <app-title-page>
            USERS LIST
        </app-title-page>
        <app-user-short-list
            :user-list="selectedUserList"
            :currentUser="selectedUser"
            @filter="setUser"
            />
        <app-user-short-list
            :user-list="currentList"
            @filter="setUser"
            :currentUser="selectedUser"
            />
        <span v-if="!usersFullList">Loading...</span>
        <pagination
            @list-update="setPage"
            :listSize="usersFullList.length"
            :itemOnPage="15"
            :seeOnPage="1"
        />
    </div>
</template>

<script>

import AppTitlePage from '../ui/AppTitlePage.vue';
import Pagination from '../ui/pagination.vue';
import UserNameMap from '@/services/UserNameMap';
import AppUserShortList from '@/components/users/AppUserShortList';
export default {
    components: {
        Pagination,
        AppTitlePage,
        AppUserShortList
    },
    emits: ['filter-user'],
    data () {
        return {
            usersFullList: null,
            userId: null,
            page: 1
        };
    },
    props: {
        currentUser: String
    },
    computed: {
        currentList () {
            let result = null;
            if (this.page >= 1) {
                result = this.usersFullList.slice((this.page - 1) * 14, ((this.page - 1) * 14) + 14);
            }
            return result;
        },
        selectedUserList () {
            return this.usersFullList.filter(item => item[0] === this.userId);
        },
        selectedUser () {
            return this.userId;
        }
    },
    methods: {
        setPage (data) {
            this.page = +(data?.page);
        },
        setUser (userId) {
            console.log('----');
            if (userId) {
                this.userId = userId;
                this.$emit('filter-user', userId);
            } else {
                this.$emit('filter-user');
                this.userId = null;
            }
        }
    },
    async mounted () {
        if (this.currentUser) {
            this.userId = this.currentUser;
        }

        if (Object.entries(UserNameMap.map) > 0) {
            this.usersFullList = Object.entries(UserNameMap.map);
        } else {
             this.usersFullList = Object.entries(await UserNameMap.updateAllMap());
        }
    }
};
</script>

<style>

</style>
