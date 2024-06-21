<script>
    import { mapState } from 'pinia'
    import { ref } from 'vue'
    import Pagination from '../partials/Pagination.vue'
    import { useUserStore } from '../../stores/UserStore'

    export default {
        setup() {
            const userStore = useUserStore();
            const currentPage = ref(1);
            const formFilter = ref({});

            return {
                userStore,
                currentPage,
                formFilter
            };
        },
        components: {
            Pagination
        },
        computed: {
            ...mapState(useUserStore, ['loading', 'users', 'total', 'filterInitial']),
        },
        methods: {
            handleClickPagination(pageNumber) {
                this.currentPage = pageNumber;
                this.getUsers(this.formFilter.filter, pageNumber, this.formFilter.limit);
            },
            handleFilter() {
                this.getUsers(this.formFilter.filter, this.formFilter.page, this.formFilter.limit);
            },
            handleClearFilter() {
                this.formFilter = JSON.parse(JSON.stringify(this.filterInitial));
                this.getUsers(this.formFilter.filter, this.formFilter.page, this.formFilter.limit);
            },
            getUsers(filter, page, limit) {
                this.userStore.getUsers(filter, page, limit);
            }
        },
        created() {
            this.formFilter = JSON.parse(JSON.stringify(this.filterInitial));
            this.getUsers(this.formFilter.filter, this.formFilter.page, this.formFilter.limit);
        },
    }
</script>

<template>
    <div class="table-users">
        <div class="table-users-filter">
            <form class="row" autocomplete="off">
                <div class="form-group col-3">
                    <label for="firstName">First Name</label>
                    <input id="firstName" type="text" placeholder="First Name" class="form-control" v-model="formFilter.filter.firstName" />
                </div>
                <div class="form-group col-3">
                    <label for="lastName">Last Name</label>
                    <input id="lastName" type="text" placeholder="Last Name" class="form-control" v-model="formFilter.filter.lastName" />
                </div>
                <div class="form-group col-4">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Email" class="form-control" v-model="formFilter.filter.email" />
                </div>
                <div class="form-group col-auto">
                    <label>&nbsp;</label>
                    <p>
                        <button type="button" class="btn btn-primary" @click="this.handleFilter">Filter</button>
                        <button type="button" class="btn btn-secondary ms-2" @click="this.handleClearFilter">Clear</button>
                    </p>
                </div>
            </form>
        </div>
        <div class="mt-3 mb-3 d-flex flex-row-reverse">
            <RouterLink :to="{ name: 'userCreate' }" class="btn btn-primary">Create</RouterLink>
        </div>
        <div class="table-users-inner">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th class="text-nowrap">First Name</th>
                        <th class="text-nowrap">Last Name</th>
                        <th class="text-nowrap">Email</th>
                        <th class="text-nowrap">Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td class="align-middle">{{ user.firstName }}</td>
                        <td class="align-middle">{{ user.lastName }}</td>
                        <td class="align-middle">{{ user.email }}</td>
                        <td class="align-middle">{{ user.createdAt }}</td>
                        <td>
                            <RouterLink :to="{ name: 'userEdit', params: { id: user.id }}" class="btn btn-primary">Edit</RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination
            :currentPage="currentPage"
            :perPage="10"
            :total="total"
            :totalPages="Math.ceil(total / formFilter.limit)"
            :maxVisibleButtons="5"
            @pagechanged="this.handleClickPagination" />
    </div>
</template>