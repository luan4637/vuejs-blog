import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "@/config";
import router from "../router";

export const usePostStore = defineStore('postStore', {
    state: () => ({
        loading: false,
        total: 0,
        filterInitial: {
            filter: {
                title: '',
                published: undefined,
                position: undefined
            },
            page: 1,
            limit: 16,
        },
        posts: ref([]),
        post: ref({}),
    }),
    actions: {
        getPosts(filter, page, limit) {
            let queryFilter = '';
            for (let key in filter) {
                if (filter[key] !== undefined && filter[key] !== '') {
                    queryFilter += '&' + key + '=' + filter[key];
                }
            }
            
            let URL = API_URL + "/post?page=" + (page ?? this.filterInitial.page) + "&limit=" + (limit ?? this.filterInitial.limit) + queryFilter;
            const _this = this;
            this.loading = true;
            axios.get(URL).then(function(response) {
                _this.loading = false;
                _this.posts = response.data.data;
                _this.total = response.data.total;
                _this.page = 0;
            });
        },
        getPost(id) {
            const URL = API_URL + "/post/" + id;
            const _this = this;
            this.loading = true;
            _this.post = {};
            axios.get(URL).then(function(response) {
                _this.loading = false;
                _this.post = response.data;
            });
        },
        submitPost(postData, file) {
            let formData = new FormData();
            for (let key in postData) {
                let fieldData = postData[key]
                if (typeof fieldData === 'object') {
                    fieldData = JSON.stringify(fieldData);
                }
                formData.append(key, fieldData);
            }
            if (file) {
                formData.append('picture', file); 
            } else {
                formData.delete('picture');
            }
            
            let URL = API_URL + '/post/save';
            axios.post(URL, formData).then(function(response) {
                router.push({ name: 'home' })
            });
        },
    },
});
