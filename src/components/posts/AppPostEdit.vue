<template>
  <Form @submit="submit">
        <div class="item">
            <span class="status" :class="{'badStatus': statusTitle >= 80}">
                {{statusTitle}} / 80
            </span>
            <Field
                name="title"
                v-model="post.title"
                :rules="isRequired80"
                placeholder="Title"/>
            <ErrorMessage name="title" class="error"/>
        </div>

        <div class="item">
            <span class="status" :class="{'badStatus': statusDescription >= 80}">
                {{statusDescription}} / 80
            </span>
            <Field
                name="description"
                v-model="post.description"
                :rules="isRequired80"
                >
                <textarea
                    rows="4"
                    placeholder="Description"
                    v-model="post.description"
                    :rules="isRequired80"
                ></textarea>
            </Field>
            <ErrorMessage name="description" class="error"/>
         </div>

          <div class="item">
            <span class="status" :class="{'badStatus': statusFullText >= 400}">
                {{statusFullText}} / 400
            </span>
            <Field
                name="FullText"
                v-model="post.fullText"
                :rules="isRequired400"
            >
                 <textarea
                    rows="12"
                    placeholder="Full post text"
                    v-model="post.fullText"
                    :rules="isRequired400"
                ></textarea>
            </Field>
            <ErrorMessage name="FullText" class="error"/>
         </div>
         <div class="my-btn">
            <app-button @submit="submit">
                <slot></slot>
            </app-button>
         </div>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import AppButton from '../ui/AppButton.vue';
export default {
    components: {
        Field,
        Form,
        ErrorMessage,
        AppButton
    },
    data () {
        return {
            post: {
                title: this.thisPost?.title,
                description: this.thisPost?.description,
                fullText: this.thisPost?.fullText
            }
        };
    },
    props: {
        thisPost: {
            type: Object
        }
    },
    computed: {
        statusTitle () {
            return this.post?.title?.length || 0;
        },
        statusDescription () {
            return this.post?.description?.length || 0;
        },
        statusFullText () {
            return this.post?.fullText?.length || 0;
        }
    },
    emits: ['form-submit'],
    methods: {
        submit () {
            this.$emit('form-submit', this.post);
        },
        isRequired80 (value) {
            if (value && value.trim() && value.length < 80) {
                return true;
            }
            let resultMsg = '';
            if (value.length >= 80) {
                resultMsg = 'Text should not be more than 80 characters long';
            }
            return resultMsg || 'This is required';
        },
        isRequired400 (value) {
            if (value && value.trim() && value.length < 400) {
                return true;
            }
            let resultMsg = '';
            if (value.length >= 400) {
                resultMsg = 'Text should not be more than 400 characters long';
            }
            return resultMsg || 'This is required';
        }
    },
    mounted () {
        if (this.thisPost.title) {
            this.post = this.thisPost;
        }
    }
};
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        flex-direction: column;
        margin: 0.5rem 1rem;

        input, textarea {
            padding: 0.2rem 0.4rem;
            border-radius: 0.5rem;
            border: none;
        }

        .status {
            align-self: flex-end;
            padding: 0 1rem 0 0;
            line-height: 1;
        }

        .badStatus {
            color: red;
        }

        .error {
            color: red;
            padding: 0 0 0 0.5rem;
        }
    }
    .my-btn {
        display: flex;
        justify-content: center;
    }
</style>
