<template>
<div class="post-list-wrapper">
    <template v-if="!isPosts">
        <h2 class="postsNotHave">
            Sorry, we not have posts...
        </h2>
    </template>
    <template v-if="isPosts">
       <ul class="post-list">
            <li class="post-list_item"
                v-for="post in postList"
                :key="post._id">
                <post-by-id
                    :post="post"
                    :isPostPage="false"
                    @post-update="this.$emit('post-update')"
                />
            </li>
        </ul>
  </template>
</div>
</template>

<script>
import PostById from '@/views/posts/PostById';
export default {
    components: {
        PostById
    },
    emits: ['post-update'],
    props: {
        postList: Array
    },
    computed: {
        isPosts () {
            return this.postList?.length > 0;
        }
    }
};
</script>

<style>
 .postsNotHave{
        text-align: center;
  }
  .post-list {
      list-style-type: none;
  }
</style>
