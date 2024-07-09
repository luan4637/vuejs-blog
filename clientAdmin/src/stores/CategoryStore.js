import { defineStore } from "pinia";
import { ref } from "vue";
import { BaseClient } from './BaseClient';
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

            let URL = "/category?page=" + (page ?? this.filterInitial.page) + "&limit=" + (limit ?? this.filterInitial.limit) + queryFilter;
            const _this = this;
            this.loading = true;
            BaseClient.get(URL).then(function(response) {
                _this.loading = false;
                _this.categories = response.data.data;
                _this.total = response.data.total;
                _this.page = 0;
            });
        },
        getCategory(id) {
            const URL = "/category/" + id;
            const _this = this;
            this.loading = true;
            _this.category = {};
            BaseClient.get(URL).then(function(response) {
                _this.loading = false;
                _this.category = response.data.data;
            });
        },
        submitCategory(categoryData) {
            let URL = '/category/save';
            BaseClient.post(URL, categoryData).then(function(response) {
                router.push({ name: 'category' })
            });
        },
    },
});
