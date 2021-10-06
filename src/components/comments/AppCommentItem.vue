<template>
<div class="item-wrapper">
  <app-comment-content
    v-if="comment"
    :comment="comment"
    :postId="postId"
    :showInnerComment="showInnerComment === 'show'"
    :isHaveInnerComments="hasChildren"
    @comment-update="updateComments"
    @toggle-inner="toggleInnerComments"
    :innerCounter="this.comment.children.length"
  />
   <div
        v-if="hasChildren"
   >
    <app-comment-item
                v-show="showInnerComment === 'show'"
                :isShowInnerComments="isShowInnerComments"
                class="inner-comment"
                v-for="item of comment.children"
                :key="item._id"
                :comment="item"
                :postId="postId"
                @comment-update="updateComments"
    />
    </div>
</div>
</template>

<script>
import AppCommentItem from './AppCommentItem';
import AppCommentContent from './AppCommentContent';
export default {
    name: 'appCommentItem',
    components: {
      AppCommentItem,
      AppCommentContent
    },
    data () {
        return {
          keyInList: 0,
          showInnerComment: 'hide'
        };
    },
    emits: ['comment-update'],
    props: {
        comment: {
            type: Object,
            required: true
        },
        postId: {
            type: String,
            required: true
        },
        isShowInnerComments: {
          type: String
        }
    },
    computed: {
      children () {
        return this.comment.children;
      },
      hasChildren () {
        return this.comment.children.length > 0;
      }
    },
    watch: {
      isShowInnerComments () {
          this.showInnerComment = this.showInnerComment === 'show' ? 'hide' : 'show';
      }
    },
    methods: {
      toggleInnerComments () {
        this.showInnerComment = this.showInnerComment === 'show' ? 'hide' : 'show';
      },
      updateComments () {
        this.showInnerComment = 'show';
        this.$emit('comment-update');
      }
    }
};
</script>

<style lang="scss" scoped>
  .inner-comment {
    position: relative;
    margin-left: 1.5rem;
  }
  @media screen and (max-width: 700px) {
     .inner-comment {
      position: relative;
      margin-left: 0rem;
    }
    .inner-comment::before {
      content: '\f0dd';
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      position: absolute;
      width: 1.5rem;
      font-size: 1.5rem;
      height: 1rem;
      left: 0.5rem;
      top: -1.4rem;
      transform: none;
      color: #028165;
    }
  }
</style>
