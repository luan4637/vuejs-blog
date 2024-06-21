import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "@/config";
import router from "../router";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        loading: false,
        total: 0,
        filterInitial: {
            filter: {
                firstName: '',
                lastName: '',
                email: ''
            },
            page: 1,
            limit: 16,
        },
        users: ref([]),
        user: ref({}),
    }),
    actions: {
        getUsers(filter, page, limit) {
            let queryFilter = '';
            for (let key in filter) {
                if (filter[key] !== undefined && filter[key] !== '') {
                    queryFilter += '&' + key + '=' + filter[key];
                }
            }

            let URL = API_URL + "/user?page=" + (page ?? this.filterInitial.page) + "&limit=" + (limit ?? this.filterInitial.limit) + queryFilter;
            const _this = this;
            this.loading = true;
            axios.get(URL).then(function(response) {
                _this.loading = false;
                _this.users = response.data.data;
                _this.total = response.data.total;
                _this.page = 0;
            });
        },
        getUser(id) {
            const URL = API_URL + "/user/" + id;
            const _this = this;
            this.loading = true;
            _this.user = {};
            axios.get(URL).then(function(response) {
                _this.loading = false;
                _this.user = response.data;
                _this.user.password = '';
            });
        },
        submitUser(userData) {
            let URL = API_URL + '/user/save';
            axios.post(URL, userData).then(function(response) {
                router.push({ name: 'user' })
            });
        },
    },
});
