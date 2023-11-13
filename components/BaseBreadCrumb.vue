<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const capitalizeFirstLetter = (str: any) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>{{ capitalizeFirstLetter(router.currentRoute.value.name) }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
