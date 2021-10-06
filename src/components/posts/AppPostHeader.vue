<template>
   <header class="header">
        <div>
            <span v-if="this.post.postedBy">
                <span class="text">Posted by:</span>
                <span class="insert">
                    <router-link :to="{ name: 'UserById', params: { uid: this.post.postedBy }}">
                        {{ postedBy }}
                     </router-link>
                </span>
            </span>
        </div>
        <div>
            <span class="text">Created on:</span>
            <time :datetime="this.post.dateCreated" class="insert">{{ this.getDate() }}</time>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        postedBy: String,
        post: Object
    },
    methods: {
        getDate () {
            const date = new Date(this.post.dateCreated);
            let mounth = date.getUTCMonth() + 1;
            if (mounth < 10) mounth = '0' + mounth;
            const result = date.getUTCDate() + '.' + mounth + '.' + date.getUTCFullYear();
            return result;
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    font-family: "Bebas Neue", cursive;
    color: rgba(0, 0, 0, 0.781);
    flex-wrap: wrap;
    border-bottom: 0.15rem #028165 solid;

    & > div {
        text-align: center;
    }
    span {
        padding: 0 0.2rem;
    }
    a{
        color: #028165;
    }
}

a {
    color: #028165;
}
</style>
