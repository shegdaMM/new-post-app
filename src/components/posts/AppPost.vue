<template>
<article class="postsItem__wrapper" v-if="post">
    <app-post-header :post="this.post" :postedBy="postedBy" />
    <main class="main">
            <section class="control" v-if="makeEdit">
                <span>
                <router-link :to="{ name: 'PostEdit', params: { pid: post._id }}" >
                    <i class="fas fa-pen"></i> edit
                </router-link>
                <a>
                    <span onclick="uploadfile.click()">
                        <i class="fas fa-cloud-upload-alt"></i> update image
                        <input type="file" class="p-button-rounded"
                        alt="upload avatar" ref="file" style="display: none" id="uploadfile" @change="sendImage($event)">
                    </span>
                </a>
                </span>
                <a @click="$emit('remove-post')" class="removePost" title="remove post">
                    <i class="fas fa-trash-alt"></i> remove
                </a>
            </section>
            <h2>
                <router-link :to="{ name: 'PostById', params: { uid: this.post._id }}">
                    {{post.title}}
                </router-link>
            </h2>
            <div class="main-wrapper">
                <section class="post__image-wrapper" v-if="post.image">
                    <img :src="`${API_IMG}${post.image}`" :alt="post.description" class="post__image">
                    <a @click="updateImage" class="updateImage" v-if="makeEdit"></a>
                </section>

                <section class="post__description">

                    <span v-if="!isPostPage" >{{post.description}} </span>
                    <span v-if="isPostPage" >{{post.fullText}} </span>
                </section>
            </div>
        </main>
    <app-post-footer
        :likesCount="likesCount"
        :post="post"
        :makeEdit="makeEdit"
        :likes="likesList"
        :isPostPage="isPostPage"
        :isLikePost="isLikePost"
        @set-likes="setLikes"
        :key="likesList.lenght"
        :isRequest=" isRequest"
     />
</article>
</template>

<script>
import UserNameMap from '@/services/UserNameMap';
import { mapActions } from 'vuex';
import AppPostHeader from '@/components/posts/AppPostHeader';
import AppPostFooter from '@/components/posts/AppPostFooter';

export default {
  data () {
        return {
            API_IMG: process.env.VUE_APP_IMG_URL,
            showLikes: false,
            UserNameMap: UserNameMap,
            postedBy: '',
            likes: {},
            isRequest: false
        };
    },
    props: {
        post: Object,
        isPostPage: {
            type: Boolean,
            default: false
        }
    },
    emits: ['post-update'],
    components: {
        AppPostHeader, AppPostFooter
    },
    computed: {
        likesCount () {
            return Object.values(this.likes).length;
        },
        makeEdit () {
            if (this.post.postedBy) {
                if ((this.isPostPage) && (this.$store.getters.loggedInUser?._id === this.post?.postedBy)) {
                    return true;
                }
            }
            return false;
        },
        isLikePost () {
            let result;
            if ((this.likes) && (this.$store.getters.loggedInUser?._id)) {
                /* this.likes.forEach(element => {
                    if (element === this.$store.getters.loggedInUser?._id) {
                        result = true;
                    }
                */
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
        ...mapActions(['updatePostImage', 'likeToPost']),
        async getNameByID (id) {
            const result = await UserNameMap.getUserName(id);
            return result;
        },
        async sendImage (event) {
            if (this.$refs.file.files[0]) {
                const formData = new FormData();
                formData.append('image', this.$refs.file.files[0]);
                await this.updatePostImage({ id: this.post._id, image: formData });
                this.$emit('post-update');
            }
        },
        async setLikes () {
            if (this.likes) {
                if (!(this.$store.getters.loggedInUser?._id === this.post?.postedBy)) {
                    let result = null;
                    try {
                        this.isRequest = true;
                        result = await this.likeToPost({ id: this.post._id });
                    } finally {
                        this.isRequest = false;
                    }
                    if (result) {
                        // this.$emit('post-update');
                        if (this.likes[this.$store.getters.loggedInUser?._id]) {
                            delete this.likes[this.$store.getters.loggedInUser?._id];
                        } else {
                            this.likes[this.$store.getters.loggedInUser?._id] = this.$store.getters.loggedInUser.name || this.$store.getters.loggedInUser.email;
                        }
                    }
                } else {
                    this.$toast.open({
                    message: 'You not can set like<br>to your post',
                    type: 'info',
                    duration: 5000
                    });
                }
            }
        }
    },
    async mounted () {
        if (this.post.dateCreated) {
            if (this.post?.postedBy) {
                const result = await UserNameMap.getUserName(this.post.postedBy);
                this.postedBy = result;
            }
            this.post.likes.forEach(async (likeUserId) => {
                const name = await UserNameMap.getUserName(likeUserId);
                this.likes[likeUserId] = name;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
a {
    color: #028165;
    text-decoration: none;
}
.isRemove {
    display: none;
}
.postsList {
     margin: 0.5rem 0.1rem;
     list-style-type: none;
}

.postsItem {
    list-style-type: none;
}

.postsItem__wrapper {
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    padding: 1rem;
    margin: 0.5rem 0.5rem 0.5rem 0;

    flex-grow: 1;
    background: rgba(255, 255, 255, 0.397);
    clip-path: polygon(0 1rem, 1.5rem 0, calc(100% - 1.5rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1.5rem) 100%, 1.5rem 100%, 0 calc(100% - 1rem));
}

.main {
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    h2 {
        margin: 0.5rem 0.2rem;
        word-break: break-all;
        font-size: 1.2rem;
    }

    .main-wrapper {
        background: rgba(255, 255, 255, 0.561);
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin: 0 0 1rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        flex-grow: 1;
        .post__image-wrapper {
            max-width: 300px;
            margin: 0 0.5rem 0rem;
            flex-basis: 250px;
            flex-grow: 1;
            flex-shrink: 1;
            text-align: center;
        }

        .post__description {
            height: 100%;
            flex-basis: 400px;
            flex-grow: 3;
            margin: 0 0.5rem 0rem;
            flex-shrink: 1;
            word-break: break-all;
        }
    }

    .control {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0.2rem;

        a{
            font-size: 0.8rem;
            padding: 0.2rem 0.5rem;
            background-color: rgba(255, 255, 255, 0.561);
            border-radius: 0.5rem;
            margin: 0 0.2rem;
            height: 100%;
        }
        .removePost{
            color: rgba(255, 0, 0, 0.664);
        }
    }
}

</style>
