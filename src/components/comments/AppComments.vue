<template>
  <app-comment-get
  :postId="postId"
  />
</template>

<script>
import AppCommentGet from '@/components/comments/AppCommentGet';
export default {
  components: { AppCommentGet },
    props: {
        postId: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
