<template>
    <div class="notify" style="display: none"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    computed: {
        ...mapGetters(['notify'])
    },
    watch: {
        notify () {
            if (this.notify) {
                const data = this.notify;
                this.$toast.open({
                    message: data.message,
                    type: data.type,
                    duration: 5000
                });
                /* const th = this;
                setTimeout(function () {
                   th.clearNotify();
                }, 5000);
                */
            }
        }
    },
    methods: {
        ...mapMutations(['clearNotify'])
    }
};
</script>

<style lang="scss" scoped>

</style>
