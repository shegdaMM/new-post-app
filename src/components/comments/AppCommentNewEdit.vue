<template>
<div class="componens-create" :key="keyUpdate">
    <comment-edit
        :startText="comment?.text || ''"
        @form-submit="modify"
    >
        <span v-if="!comment">CREATE COMMENT</span>
        <span v-if="comment">SAVE</span>
    </comment-edit>
</div>
</template>

<script>
import CommentEdit from './CommentEdit.vue';
import { mapActions } from 'vuex';

export default {
    components: {
        CommentEdit
    },
    data () {
        return {
            debounce: null,
            keyUpdate: 0
        };
    },
    emits: ['refresh-comment'],
    props: {
        postId: {
            type: String,
            required: true
        },
        followedCommentId: {
            type: String
        },
        comment: {
            type: Object
        }
    },
    methods: {
        ...mapActions(['createComment', 'updateComment']),
        async modify (text) {
            if (this.comment) {
                this.keyUpdate = this.keyUpdate + 1;
                await this.updateComment({ id: this.comment._id, text: text });
            } else {
                this.keyUpdate = this.keyUpdate + 1;
                await this.createComment({ postID: this.postId, text: text, followedCommentID: this.followedCommentId || null });
            }
            this.$emit('refresh-comment');
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
