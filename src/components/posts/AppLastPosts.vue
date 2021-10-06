<template>
  <div class="posts-wrapper">
     <ul class="my-last-posts">
            <li class="my-last-posts-item"
                v-for="post in currentPostsList"
                :key="post._id">
                <post-by-id
                    :post="post"
                    :isPostPage="false"
                    @post-update="update"
                />
            </li>
        </ul>
     <full-width-buttom :to="'/posts'">
         <i class="fas fa-reply" style="transform: rotate(180deg)"> </i>SHOW ALL POSTS
     </full-width-buttom>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PostById from '@/views/posts/PostById';
import FullWidthButtom from '../ui/fullWidthButtom.vue';

export default {
    components: {
       PostById, FullWidthButtom
    },
    computed: {
        ...mapGetters(['postsListSize', 'currentPostsList'])
    },
    methods: {
        ...mapActions(['getPostsList', 'clearPostsList']),
        async update () {
            await this.getPostsList({
                limit: 1,
                skip: 0
            });
            if (this.postsListSize > 3) {
                await this.getPostsList({
                    limit: 3,
                    skip: this.postsListSize - 3
                });
            }
        }
    },
    async created () {
        await this.update();
    },
    beforeUnmount () {
        // this.clearPostsList();
    }
};
</script>

<style lang="scss" scoped>
    .my-last-posts {
        display: flex;
        padding: 0 0.5rem;
        widows: 100%;
        flex-wrap: wrap;
        list-style-type: none;
        & > * {
            flex: 1 1 50%;
        }
    }
    .my-last-posts-item {
        .post-wrapper {
            height: 100%;
        }
    }

    @media screen and (max-width: 721px){
        .my-last-posts {
        & > * {
            flex: 1 1 100%;
        }
    }
    }
</style>
