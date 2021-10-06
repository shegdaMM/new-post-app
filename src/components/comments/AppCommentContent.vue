<template>
  <article class="commentsItem__wrapper" v-if="comment">
      <app-comment-content-header
        class="comment-header"
        :commentedBy="commentedBy"
        :comment="comment"
      />
      <main class="comment-body">
        <div
            class="control"
            v-if="makeEdit"
        >
            <a
                class="control-btn"
                @click="editComment = !editComment"
            >
                <span v-if="!editComment"><i class="fas fa-edit"></i> EDIT COMMEN</span>
                <span v-if="editComment"><i class="fas fa-eye"></i> SHOW COMMENT</span>
            </a>
            <a
                class="control-btn"
                @click="removeComment"
                style="color: rgba(255, 0, 0, 0.685);"
            >
                <i class="fas fa-trash-alt"></i> REMOVE COMMEN
            </a>
        </div>
        <div class="comment-content">
            <template v-if="!editComment">
            <div class="comment-text">
                {{comment.text}}
            </div>
        </template>
        <template v-if="editComment">
            <app-comment-new-edit
                :postId="postId"
                :followedCommentId="comment._id"
                :comment="comment"
                @refresh-comment="updateComment"
            />
        </template>
        </div>
      </main>
      <app-comment-content-footer
        class="commment-footer"
        :likesCount="likesCount"
        :comment="comment"
        :makeEdit="makeEdit"
        :likes="likes"
        :isLikeComment="isLikeComment"
        @set-likes="setLikes"
        @add-comment="showNew"
        :key="likesList.lenght"
        :isRequest=" isRequest"
      />
      <app-comment-new-edit
        v-if="newComment"
        :postId="postId"
        :followedCommentId="comment._id"
        @refresh-comment="this.newComment=false, this.$emit('comment-update');"
      />
    <button class="show-inner-comments" @click="toogleInnerComment" v-if="isHaveInnerComments">
        <i class="fas" :class="{ 'fa-minus-square': showInnerComment, 'fa-plus-square': !showInnerComment}"></i>
        <span class="count"> {{innerCounter}}</span>
    </button>
  </article>
</template>
<script>
import AppCommentContentHeader from '@/components/comments/AppCommentContentHeader';
import UserNameMap from '@/services/UserNameMap';
import { mapActions } from 'vuex';
import AppCommentContentFooter from './AppCommentContentFooter.vue';
import AppCommentNewEdit from '@/components/comments/AppCommentNewEdit';
export default {
    components: {
        AppCommentContentHeader, AppCommentContentFooter, AppCommentNewEdit
    },
    props: {
        comment: {
            type: Object,
            required: true
        },
        postId: {
            type: String,
            required: true
        },
        showInnerComment: {
            type: Boolean,
            default: false
        },
        isHaveInnerComments: {
            type: Boolean,
            default: false
        },
        innerCounter: {
            type: Number,
            default: 0
        }
    },
    emits: ['comment-update', 'toggle-inner'],
    data () {
        return {
            UserNameMap: UserNameMap,
            commentedBy: '',
            likes: {},
            newComment: false,
            editComment: false,
            isRequest: false
        };
    },
    computed: {
        likesCount () {
            return Object.values(this.likes).length;
        },
        makeEdit () {
            if (this.comment?.commentedBy) {
                if (this.$store.getters.loggedInUser?._id === this.comment?.commentedBy) {
                    return true;
                }
            }
            return false;
        },
        isLikeComment () {
            let result;
            if ((this.likes) && (this.$store.getters.loggedInUser?._id)) {
                if (this.likes[this.$store.getters.loggedInUser?._id]) {
                    result = true;
                }
            } else result = false;
            return result;
        },
        likesList () {
            return this.likes;
        }
    },
    methods: {
        ...mapActions(['likeToComment', 'updateComment', 'deleteComment']),
        async getNameByID (id) {
            const result = await UserNameMap.getUserName(id);
            return result;
        },
        showNew () {
            this.newComment = !this.newComment;
        },
        removeComment () {
            this.$q.dialog({
                title: 'Remove this post?',
                message: 'Are you sure you want to delete your post?',
                cancel: true,
                persistent: true,
                color: 'black'
            })
            .onOk(() => {
                this.removeCommentProcess();
            });
        },
        updateComment () {
            this.editComment = false;
            this.$emit('comment-update');
        },
        async removeCommentProcess () {
            await this.deleteComment({ id: this.comment._id });
            this.$emit('comment-update');
        },
        async setLikes () {
            if (this.likes) {
                if (!(this.$store.getters.loggedInUser?._id === this.comment?.commentedBy)) {
                    let result = null;
                    try {
                        this.isRequest = true;
                        result = await await this.likeToComment({ id: this.comment._id });
                    } finally {
                        this.isRequest = false;
                    }
                    if (result) {
                        // this.$emit('comment-update');
                         if (this.likes[this.$store.getters.loggedInUser?._id]) {
                            delete this.likes[this.$store.getters.loggedInUser?._id];
                        } else {
                            this.likes[this.$store.getters.loggedInUser?._id] = this.$store.getters.loggedInUser.name || this.$store.getters.loggedInUser.email;
                        }
                    }
                } else {
                this.$toast.open({
                message: 'You not can set like<br>to your comment',
                type: 'info',
                duration: 5000
                });
                }
            }
        },
        toogleInnerComment () {
            this.$emit('toggle-inner');
        }
    },
    async mounted () {
        if (this.comment?.dateCreated) {
            if (this.comment?.commentedBy) {
                const result = await UserNameMap.getUserName(this.comment?.commentedBy);
                this.commentedBy = result;
            }
            this.comment.likes.forEach(async (likeUserId) => {
                const name = await UserNameMap.getUserName(likeUserId);
                this.likes[likeUserId] = name;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.commentsItem__wrapper{
    background: rgba(255, 255, 255, 0.411);
    padding: 0.5rem 0.5rem 1.5rem 0.5rem;
    margin-bottom: 0.25rem;
    border-radius: 0.5rem;
}
.show-inner-comments {
    background: transparent;
    border: none;
    position: absolute;
    width: 2rem;

    display: flex;
    justify-content: space-around;
    align-items: center;

    i {
        font-weight: 900;
        width: 1.2rem;
        font-size: 1.2rem;
        height: 1rem;
        left: 0.5rem;
        top: -1.4rem;
        transform: none;
        color: #028165;
    }

    .count {
        font-size: 0.8rem;
        color: #028165;

    }
}
.comment-body {
    .control {
        font-size: 0.7rem;
        display: flex;
        justify-content: flex-end;
        color: #028165;
        font-weight: 700;

    }
    .control-btn {
        display: inline-block;
        margin: 0.05rem 0.4rem;
        padding: 0.2rem;
        text-decoration: none;
        cursor: pointer;
    }
    .comment-content {
        margin: 0.3rem 0;
    }
    .comment-text {
        padding: 0.25rem 0.5rem;
        border-radius: 0.2rem;
        background: rgba(255, 231, 96, 0.541);
    }
}
</style>
