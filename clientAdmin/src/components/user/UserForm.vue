<script>
    import { mapState } from 'pinia'
    import { useUserStore } from '../../stores/UserStore'

    export default {
        setup() {
            const userStore = useUserStore();
            const userObject = {
                name: '',
                email: '',
                password: ''
            };

            return {
                userStore,
                userObject
            };
        },
        computed: {
            ...mapState(useUserStore, ['loading', 'user'])
        },
        methods: {
            getUser(id) {
                this.userStore.getUser(id);
            },
            onSubmitForm() {
                this.userStore.submitUser(this.user);
            }
        },
        created() {
            if (this.$route.params.id) {
                this.getUser(this.$route.params.id);
            } else {
                this.user = Object.assign(this.user, this.userObject);
            }
        }
    }
</script>

<template>
    <form>
        <div class="row mb-3">
            <label class="col-2 col-form-label">Full name</label>
            <p class="col-10">
                <input v-model="user.name" class="form-control" />
            </p>
        </div>
        <div class="row mb-3">
            <label class="col-2 col-form-label">Email</label>
            <p class="col-10">
                <input v-model="user.email" class="form-control" />
            </p>
        </div>
        <div class="row mb-3">
            <label class="col-2 col-form-label">Password</label>
            <p class="col-10">
                <input v-model="user.password" class="form-control" />
            </p>
        </div>
        <div class="btn-group">
            <RouterLink :to="{ name: 'user'}" class="btn btn-secondary">Back</RouterLink>
            <button type="button" class="btn btn-primary pull-right" @click="onSubmitForm">Save</button>
        </div>
    </form>
</template>