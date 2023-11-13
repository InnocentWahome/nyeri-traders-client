<script setup lang="ts">

const userRole = useCookie('user_role')

</script>

<template>
  <div>
    <ModulesProductsSuperAdminView v-if="userRole === 'Super-Admin'" />

    <ModulesProductsSellerView v-if="userRole === 'Seller'" />

    <ModulesProductsBuyerView v-if="userRole === 'Buyer'" />

  </div>
</template>
