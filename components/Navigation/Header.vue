<script lang="ts" setup>
import { ref, Ref, watch } from "vue";
import { useRouter } from "vue-router";

interface MenuItem {
  key: string;
  label: string;
  route: string;
}

const router = useRouter();

const userRole = useCookie<string | any>('user_role')

const menuItems: Record<string, MenuItem[]> = {
  'Buyer': [
    { key: "1", label: "Products", route: "/products" },
    { key: "2", label: "All Categories", route: "/categories" },
    { key: "3", label: "My Orders", route: "/orders" },
  ],
  'Seller': [
    { key: "5", label: "My Products", route: "/products" },
    { key: "6", label: "Orders Placed", route: "/orders" },
    { key: "7", label: "Product categories", route: "/categories" },
  ],
  'Super-Admin': [
    { key: "8", label: "Orders", route: "/orders" },
    { key: "9", label: "Users", route: "/users" },
    { key: "10", label: "Products", route: "/products" },
    { key: "11", label: "All Categories", route: "/categories" },
  ],
};

const selectedKeys = ref<string[]>(["1"]);

watch(
  () => router.currentRoute.value.path,
  (newRoute) => {
    // Update selectedKeys based on the current route
    selectedKeys.value = menuItems[userRole.value]
      .filter((item) => item.route === newRoute)
      .map((item) => item.key);
  }
);
</script>

<template>
  <a-layout-header class="header">
    <div class="logo" />
    <a-menu
      :selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item v-for="item in menuItems[userRole]" :key="item.key">
        <NuxtLink :to="item.route">
          {{ item.label }}
        </NuxtLink>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
