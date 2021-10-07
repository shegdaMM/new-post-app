<template>
  <section class="statistics">
      {{usersCount}}
      {{postsListSize}}
      <p>
      </p>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserNameMap from '@/services/UserNameMap';
import axios from 'axios';

const API_URL = process.env.VUE_APP_URL;

export default {
    data () {
        return {
            usersCount: 0,
            works: null,
            firstPost: null
        };
    },
    computed: {
        ...mapGetters(['postsListSize', 'currentPostsList']),
        countWorks () {
            return this.works;
        }
    },
    methods: {
        ...mapActions(['getPostsList', 'clearPostsList'])
    },
    async created () {
        const count = await UserNameMap.updateAllMap();
        // await usersService.getAllUsersObject();
        this.usersCount = Object.keys(count).length;

        try {
            await axios.get(`${API_URL}/posts`, { limit: 1, skip: 0 }).then((response) => {
                this.firstPost = response.data.data[0].dateCreated;
                /* const app = this;
                setInterval(function () {
                    app.works = {
                        year: formatDistance(new Date())
                    };
                }, 1000);
                */
            });
        } catch (error) {
            console.log(error);
        }
    },
    mounted () {
    },
    beforeUnmount () {
        this.clearPostsList();
    }
};
</script>

<style lang="scss" scoped>
    .statistics{
        background: rgba(255, 247, 247, 0.589);
        padding: 0 1.5rem;
    }
</style>
