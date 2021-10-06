<template>
  <footer class="footer">
            <section class="footer__control">
                <div class="likes">
                    <a class="text" @click="likeComment($event)" :class="{'like-active' : !this.isLikeComment, 'point-event': isRequest }">
                       <i class="fas fa-heart fa" style="font-size: 2rem; color: #c60000"></i>
                    </a>
                    <div v-if="likesCount > 0" @click="showLikes = !showLikes">
                        <span class="insert">
                            <span> {{ likesCount }} </span>
                        </span>
                        <span class="showLikeList">
                            <i class="fas fa-eye" v-if="!showLikes"></i>
                            <i class="fas fa-eye-slash" v-if="showLikes"></i>
                        </span>
                    </div>
                </div>
                <div class="moreLink" v-if="this.$store.getters.loggedInUser?._id">
                    <a @click="this.$emit('add-comment')"><i class="fas fa-comment-medical"></i> comment this</a>
                </div>
            </section>
            <ul class="likesList" v-if="showLikes">
              <li class="likesItem" v-for="like in comment.likes" :key="like">
                    <span v-if="likes[like]">
                        <router-link :to="{ name: 'UserById', params: { uid: like }}" class="likeLink">
                            {{likes[like]}}
                        </router-link>
                    </span>
                </li>
            </ul>
        </footer>
</template>

<script>
export default {
    data () {
        return {
            showLikes: false
        };
    },
    emits: ['comment-update', 'set-likes', 'add-comment'],
    props: {
        likesCount: Number,
        comment: Object,
        makeEdit: Boolean,
        likes: Object,
        isLikeComment: Boolean,
        isRequest: Boolean
    },
    methods: {
        likeComment (event) {
            event.target.disabled = true;
            if (this.$store.getters.loggedInUser?._id) {
                this.$emit('set-likes');
            } else {
                this.$toast.open({
                    message: 'You mast log in<br>for set like comment',
                    type: 'info',
                    duration: 5000
                });
            }
            setTimeout(function () { event.target.disabled = false; }, 2000);
        }
    }
};
</script>

<style lang="scss" scoped>
.point-event {
    pointer-events: none;
}
.like-active {
    filter: opacity(25%);
}
a {
    color: #028165;
}
.footer {
    display: flex;
    flex-direction: column;
    font-family: "Bebas Neue", cursive;
    color: rgba(0, 0, 0, 0.781);

    border-top: 0.15rem #028165 solid;
    padding: 0.5rem 0.5rem 0.1rem 0.5rem ;
}

.footer__control {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .likes {
        padding: 0 1.5rem 0 0rem;
        width: 3.5rem;

        position: relative;

        .insert {
            position: absolute;
            display: inline-block;
            top: -0.2rem;
            right: 0rem;
            width: 1.5rem;
            text-align: center;
            font-weight: 700;
            color: #028165;
        }

        .showLikeList {
                display: inline-block;
                position: absolute;
                bottom: 0;
                right: 0;
                width: 1.5rem;
                color: #028165;
                text-align: center;
        }
    }
    .moreLink {
        padding: 0 0.25rem;
        color: #028165;
        a{
            text-decoration: none;
            cursor: pointer;
        }
    }
}

.likesList {
    display: flex;
    flex-wrap: wrap;

    list-style-type: none;

    .likesItem {
        margin: 0.2rem 0.5rem 0.2rem 0;

        a{
            display: block;
            height: 100%;
            text-decoration: none;
            cursor: pointer;
        }
        span {
            display: inline-block;
            padding: 0.1rem 0.5rem;
            background: rgba(255, 255, 255, 0.561);
            border-radius: 0.5rem 0.5rem 0.3rem 0.5rem;
        }
    }
}
</style>
