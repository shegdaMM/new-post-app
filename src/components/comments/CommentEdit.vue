<template>
  <Form @submit="submit">
    <div class="item">
        <span class="status" :class="{'badStatus': statusText >= 80}">
            {{statusText}} / 80
        </span>
        <Field
            name="description"
            v-model="text"
            :rules="isRequired80"
        >
            <textarea
                rows="2"
                placeholder="Create new comment"
                v-model="text"
                :rules="isRequired80"
            />
        </Field>
        <ErrorMessage name="description" ref="errorMsg" class="error"/>
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
    emits: ['form-submit'],
    data () {
        return {
            text: this.startText || ''
        };
    },
    props: {
        startText: {
            type: String
        }
    },
    computed: {
        statusText () {
            return this.text.length || 0;
        }
    },
    methods: {
        submit () {
                this.$emit('form-submit', this.text);
                if (!this.startText) {
                    this.text = '';
                }
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
        justify-content: flex-end;
        padding-right: 1rem;
    }
</style>
