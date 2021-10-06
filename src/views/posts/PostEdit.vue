<template>
    <div class="info">
        <div class="post-text" v-if="currentPost?.dateCreated">
            <span class="discriptoin">POST CREATED:</span>
            <span class="post__dateCreated">{{postCreateDate}}</span>
        </div>
         <div class="post-text" v-if="currentPost?._id">
            <span class="discriptoin">ID:</span>
            <span class="post__id">{{currentPost._id}}</span>
        </div>
        <div class="post-text" v-if="currentPost?.postedBy">
            <span class="discriptoin">Posted By:</span>
            <router-link :to="`/user/${currentPost?.postedBy}`">{{postedBy}}</router-link>
        </div>
    </div>
      <app-post-edit
        v-if="currentPost?.title"
        @form-submit="savePost"
        :thisPost="currentPost">
        SAVE
      </app-post-edit>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppPostEdit from '@/components/posts/AppPostEdit';
import UserNameMap from '@/services/UserNameMap';

export default {
    name: 'edit-post',
    components: {
        AppPostEdit
    },
    data () {
        return {
            editPost: this.currentPost,
            postedBy: ''
        };
    },
    props: {
        pid: {
            type: String,
            requare: true
        }
    },
    computed: {
         ...mapGetters(['currentPost']),
         postCreateDate () {
            const date = new Date(this.currentPost.dateCreated);
            let mounth = date.getUTCMonth() + 1;
            if (mounth < 10) mounth = '0' + mounth;
            let result = date.getUTCDate() + '.' + mounth + '.' + date.getUTCFullYear();
            result = result + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes();
            return result;
        }
    },
    methods: {
        ...mapActions(['getPostById', 'clearCurrentPost', 'patchCurrentPost']),
        async savePost (data) {
            await this.patchCurrentPost(data);
        }
    },
    async created () {
        if (this.pid) {
            await this.getPostById({ id: this.pid });
            if (this.currentPost?.postedBy) {
                const result = await UserNameMap.getUserName(this.currentPost.postedBy);
                this.postedBy = result;
            }
        }
        if (this.$store.getters.loggedInUser?._id !== this.currentPost?.postedBy) {
           this.$router.go(-1);
        }
    },
    beforeUnmount () {
        this.clearCurrentPost();
    }
};
</script>

<style lang="scss" scoped>
.info {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 0.2rem auto;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    flex-wrap: wrap;
}
.info > * {
    flex-grow: 1;
    flex-shrink: 1;
    margin: 0.25rem 0.4rem 0.1rem;
    padding: 0.2rem 0.7rem 0.1rem;
    border: #00af89 solid 0.1rem;
    border-radius: 1rem;
}
.post-text {
    margin-bottom: 0.5rem;
    display: flex;
  }
  .discriptoin {
    font-family: 'Bebas Neue', cursive;
    display: inline-block;
    min-width: 6.5rem;
}
</style>
