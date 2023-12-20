<template>
    <div>
        <div>
            <nuxt-link to="/test">index</nuxt-link>
        </div>
        <n-icon size="40">
            <Search/>
        </n-icon>
    </div>
</template>
<script setup>
    import { NIcon } from 'naive-ui';
    import {Search} from '@vicons/ionicons5'
</script>