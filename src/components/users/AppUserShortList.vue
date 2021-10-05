<template v-if="userList">
   <ul class="users">
       <li class="users__item" v-for="user in userList" :key="user[0]">
           <input type="radio"
            :id="user[0]"
            :value="user[0]"
            v-model="selectedUser"
            class="hide">
            <label :for="user[0]">
                <a>
                    <i class="far fa-user"
                        :class="{'fas': user[0] === this.isLoginUser}"></i>
                    {{user[1].name || user[1].email}}
                </a>
            </label>
            <button @click="unSelectedUser" class="unCheckUserId" v-if="currentUser === user[0]"><i class="fas fa-times"></i></button>
       </li>
    </ul>
</template>

<script>

export default {
    props: {
        userList: {
            type: Array,
            require: true
        },
        currentUser: String
    },
    emits: ['filter'],
    data () {
        return {
            selectedUser: null
        };
    },
    computed: {
        isLoginUser () {
            return this.$store.getters.loggedInUser?._id;
        }
    },
    watch: {
        selectedUser () {
            if (this.selectedUser) {
                this.$emit('filter', this.selectedUser);
            } else {
                this.$emit('filter');
            }
        },
        currentUser () {
            if (this.currentUser) {
                this.selectedUser = this.currentUser;
            } else {
                this.selectedUser = null;
            }
        }
    },
    methods: {
        unSelectedUser () {
            this.selectedUser = null;
        }
    },
    mounted () {
       if (this.currentUser) {
           this.selectedUser = this.currentUser;
       } else {
           this.selectedUser = null;
       }
    }

};
</script>

<style lang="scss" scoped>
    .hide {
        display: none;
    }
     .users__item {
        list-style-type: none;
        position: relative;

         .unCheckUserId {
            display: inline-block;
            font-weight: 700;
            font-size: 1rem;
            margin: 0.1rem auto 0.5rem 0;
            color: red;
            position: absolute;
            top: -1px;
            right: 1rem;
            height: 100%;
            z-index: 5;

            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 0.5rem;
        }
        a{
            width: 100%;
            padding: 0.25rem 1.3rem 0.25rem 0.5rem;
            margin: 0.25rem 0.1rem 0.25rem 0;
            background: #ffffff;
            color: #00795e;
            font-weight: 500;
            display: block;
            border-radius: 0.8rem;

            i{
                float: left;
                padding: 0.3rem 0.2rem 0 0;
            }
        }
        input {
            position: absolute;
            right: 1rem;
            height: 100%;
            background: #00af89;
        }
        label {
            display: block;
            width: 100%;
            height: 100%;
            word-wrap: break-word;
        }
     }
</style>
