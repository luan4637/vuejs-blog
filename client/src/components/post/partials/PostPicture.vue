<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    post: Object
})
</script>

<template>
    <figure class="post-item-image"
        ><RouterLink :to="{ name: 'postDetail', params: { id: post.id }}"
        ><img :src="(post.picture ? post.picture : '/img/600x450.png')" :alt="post.title" /></RouterLink></figure>
</template>
