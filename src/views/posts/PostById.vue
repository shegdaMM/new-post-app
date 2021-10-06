<template>
    <div class="post-wrapper" v-if="thisPost">
        <app-post
            :post="thisPost"
            :isPostPage="isPostPage"
            @post-update="updatePost"
            @remove-post="removePostDialog"
        />
        <app-comments
        :postId="thisPost._id"
        v-if="isPostPage"/>
    </div>
</template>

<script>
import AppPost from '@/components/posts/AppPost';
import { mapGetters, mapActions } from 'vuex';
import AppComments from '@/components/comments/AppComments';

export default {
    name: 'PostById',
    emits: ['post-update', 'remove-post'],
    components: {
        AppPost,
        AppComments
    },
    props: {
        uid: {
            type: String
        },
        post: {
            type: Object
        },
        isPostPage: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters(['currentPost']),
        thisPost () {
            let result;
            if (this.post) {
                result = this.post;
            } else if (this.uid) {
                result = this.currentPost;
            }
            return result;
        }
    },
    methods: {
        ...mapActions(['getPostById', 'clearCurrentPost']),
        removePostDialog () {
            this.$q.dialog({
                title: 'Remove this post?',
                message: 'Are you sure you want to delete your post?',
                cancel: true,
                persistent: true,
                color: 'black'
            })
            .onOk(() => {
                this.removePost();
            });
        },
        async removePost () {
            if (this.thisPost?._id) {
                await this.removePostById({ id: this.thisPost?._id });
                this.$router.go(-1);
            }
        },
        async updatePost () {
            if (this.thisPost?._id) {
                await this.getPostById({ id: this.thisPost?._id });
            }
        }
    },
    async created () {
        if (this.uid) {
             await this.getPostById({ id: this.uid });
        }
    },
    beforeUnmount () {
        this.clearCurrentPost();
    }
};
</script>

<style lang="scss" scoped>
    .post-wrapper {
        display: flex;
        flex-direction: column;
    }
</style>
