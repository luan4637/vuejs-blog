<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="header">
        <div class="container">
            <RouterLink class="logo" to="/"><img src="./assets/logo.svg" /></RouterLink>
        </div>
    </div>
    <div class="main-content">
        <div class="container">
            <RouterView />
        </div>
    </div>
    <div class="footer">
        <div class="container">
            Footer
        </div>
    </div>
</template>
