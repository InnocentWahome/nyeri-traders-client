<script setup lang="ts">

const userRole = useCookie('user_role')

</script>

<template>
  <div>
    <ModulesCategoriesSuperAdminView v-if="userRole === 'Super-Admin'" />

    <ModulesCategoriesSellerView v-if="userRole === 'Seller'" />

    <ModulesCategoriesBuyerView v-if="userRole === 'Buyer'" />

  </div>
</template>
