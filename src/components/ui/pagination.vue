<template>
 <section class="pagination" v-if="isNeedPagination">
        <a @click="prevPage" title="previous" class="pagination__item" v-if="showArrowLeft">
          <span class="fas fa-angle-left"></span>
        </a>
        <a @click="goto(1)"
        class="pagination__item"
        :class="{'pagination__item-active': this.page == 1}"
        >
            <span> 1 </span>
        </a>
        <span class="pagination__item pagination__item--more"
        v-if="isMoreLeft">...</span>
        <template v-for="i in  paginationCounts" :key="i">
          <a @click="goto(i)"
          class="pagination__item" :class="{'pagination__item-active': i == this.page}">
                <span> {{ i }} </span>
          </a>
        </template>
        <span class="pagination__item pagination__item--more" v-if="isMoreRight">...</span>
        <a @click="goto(pagenationCount)"
        class="pagination__item"
        :class="{'pagination__item-active': this.page == pagenationCount}"
        >
            <span> {{ pagenationCount }} </span>
        </a>
        <a @click="nextPage" title="next" class="pagination__item" v-if="showArrowRight">
          <span class="fas fa-angle-right"></span>
        </a>
    </section>
</template>

<script>
export default {
    data () {
        return {
            page: +(this.propPage)
        };
    },
    emits: ['list-update'],
    props: {
        listSize: {
            type: Number,
            default: 0,
            required: true
        },
        itemOnPage: {
            type: Number,
            default: 10,
            required: true
        },
        seeOnPage: {
            type: Number,
            default: 2
        },
        propPage: {
            type: Number,
            default: 1
        }
    },
    computed: {
        pagenationCount () {
            return Math.ceil(this.listSize / this.itemOnPage);
        },
        isNeedPagination () {
            return this.pagenationCount && (this.pagenationCount > 1);
        },
        paginationCounts () {
            const showCount = +(this.seeOnPage);
            const result = [];
            for (let i = +this.page - showCount; i <= +this.page + showCount; i++) {
                if (i > 1 && i < this.pagenationCount) {
                    result.push(i);
                }
            }
            return result;
        },
        isMoreLeft () {
            return this.page > 3;
        },
        isMoreRight () {
            return this.page < (this.pagenationCount - 3);
        },
        showArrowLeft () {
            const result = this.pagenationCount > 4 && this.page !== 1;
            return result;
        },
        showArrowRight () {
            const result = this.pagenationCount > 4 && this.page !== this.pagenationCount;
            return result;
        }
    },
    watch: {
        page () {
            if (this.page) {
                this.$emit('list-update', { page: this.page });
            }
        },
        propPage () {
            this.page = this.propPage;
        }
    },
    methods: {
        goto (current) {
          this.page = current;
        },
        nextPage () {
            this.goto(this.page + 1);
        },
        prevPage () {
            this.goto(this.page - 1);
        }
    },
    mounted () {
    }
};
</script>

<style lang="scss" scoped>
    .pagination {
            display: flex;
            justify-content: center;
            margin: 0.7rem 0.2rem;
            font-size: 1rem;
    }
    .pagination__item {
        width: 1.5rem;
        height: 1.5rem;
        background: #fff;
        color: #025a47;
        margin: 0 0.2rem;
        border-radius: 50%;
        font-weight: 700;
        height: 100%;
        text-decoration: none;
        cursor: pointer;
        font-size: 0.9rem;
        font-family: 'Bebas Neue', cursive;
        display: flex;
        justify-content: center;
        align-self: center;
        height: 100%;

        span {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0;

            margin-bottom: -0.15rem;
        }
    }
    .pagination__item-active {
         color: #fff;
         background: #025a47;
    }
    .pagination__item--more{
      background: transparent;
      padding: 0.5rem 0.1rem;
      margin: 0 0.1rem;
      cursor: default;
    }
</style>>
