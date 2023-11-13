<script setup lang="ts">

const userRole = useCookie('user_role')

</script>

<template>
  <div>
    <ModulesOrdersSuperAdminView v-if="userRole === 'Super-Admin'" />

    <ModulesOrdersSellerView v-if="userRole === 'Seller'" />

    <ModulesOrdersBuyerView v-if="userRole === 'Buyer'" />

  </div>
</template>
