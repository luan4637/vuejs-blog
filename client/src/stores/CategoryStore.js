import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "./constants";

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        loading: false,
        total: 0,
        skip: 0,
        limit: 10,
        categories: ref([]),
        category: ref({}),
    }),
    actions: {
        getCategories(skip, limit) {
            let URL = API_URL + "/category?skip=" + (skip ?? 0) + "&limit=" + (limit ?? 10) + "&showInNav=1";
            const _this = this;
            this.loading = true;
            axios.get(URL).then(function(response) {
                _this.loading = false;
                _this.categories = response.data.data;
                _this.total = response.data.total;
                _this.skip = 0;
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
    },
});
