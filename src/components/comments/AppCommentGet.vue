<template>
    <div class="comments-list" :key="reload">
        <app-comment-new-edit
            style="margin-bottom: 0.4rem;"
            :postId="postId"
            v-if="this.$store.getters.isAuthenticated"
            @refresh-comment="getCommentsByPost({ postID: this.postId })"
        />
        <div class="inner-comments-control-toggle">
            <q-radio v-model="toggle" val="show" label="Show inners" />
            <q-radio v-model="toggle" val="hide" label="Hide inners" />
        </div>
        <section class="comments">
            <app-comment-item
                :isShowInnerComments="toggle"
                v-for="comment in comments"
                :key="comment._id"
                :comment="comment"
                :postId="postId"
                @comment-update="getCommentsByPost({ postID: this.postId })"
            />
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppCommentItem from './AppCommentItem';
import AppCommentNewEdit from './AppCommentNewEdit.vue';

export default {
    components: {
        AppCommentItem, AppCommentNewEdit
    },
    data () {
        return {
            reload: 0,
            toggle: 'hide'
        };
    },
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters(['comments'])
    },
    methods: {
        ...mapActions(['getCommentsByPost', 'clearCommentsByPost'])
    },
    async mounted () {
        await this.getCommentsByPost({ postID: this.postId });
    },
    beforeUnmount () {
        this.clearCommentsByPost();
  }
};
</script>

<style lang="scss" scoped>
    .comment-list{
        margin: 0.2rem 0.4rem;
    }
</style>
