import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "@/config";
import router from "../router";

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        loading: false,
        total: 0,
        filterInitial: {
            filter: {
                name: '',
                description: '',
            },
            page: 1,
            limit: 16,
        },
        categories: ref([]),
        category: ref({}),
    }),
    actions: {
        getCategories(filter, page, limit) {
            let queryFilter = '';
            for (let key in filter) {
                if (filter[key] !== undefined && filter[key] !== '') {
                    queryFilter += '&' + key + '=' + filter[key];
                }
            }

            let URL = API_URL + "/category?page=" + (page ?? this.filterInitial.page) + "&limit=" + (limit ?? this.filterInitial.limit) + queryFilter;
            const _this = this;
            this.loading = true;
            axios.get(URL).then(function(response) {
                _this.loading = false;
                _this.categories = response.data.data;
                _this.total = response.data.total;
                _this.page = 0;
            });
        },
        getCategory(id) {
            const URL = API_URL + "/category/" + id;
            const _this = this;
            this.loading = true;
            _this.category = {};
            axios.get(URL).then(function(response) {
                _this.loading = false;
                _this.category = response.data;
            });
        },
        submitCategory(categoryData) {
            let URL = API_URL + '/category/save';
            axios.post(URL, categoryData).then(function(response) {
                router.push({ name: 'category' })
            });
        },
    },
});
