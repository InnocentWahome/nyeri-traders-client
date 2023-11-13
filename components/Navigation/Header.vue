<script lang="ts" setup>
import { ref, Ref, watch } from "vue";
import { useRouter } from "vue-router";

import {
  AppstoreOutlined,
  GroupOutlined,
  BookOutlined,
  ContactsOutlined,
} from "@ant-design/icons-vue";

interface MenuItem {
  key: string;
  label: string;
  route: string;
  iconName: string;
}

const { logout } = useAuthentication();

const router = useRouter();

const userRole = useCookie<string | any>("user_role");

const menuItems: Record<string, MenuItem[]> = {
  Buyer: [
    {
      key: "1",
      label: "Products",
      iconName: "AppstoreOutlined",
      route: "/products",
    },
    {
      key: "2",
      label: "All Categories",
      iconName: "GroupOutlined",
      route: "/categories",
    },
    {
      key: "3",
      label: "My Orders",
      iconName: "BookOutlined",
      route: "/orders",
    },
  ],
  Seller: [
    {
      key: "5",
      label: "My Products",
      iconName: "AppstoreOutlined",
      route: "/products",
    },
    {
      key: "6",
      label: "Orders Placed",
      iconName: "BookOutlined",
      route: "/orders",
    },
    {
      key: "7",
      label: "Product categories",
      iconName: "GroupOutlined",
      route: "/categories",
    },
  ],
  "Super-Admin": [
    { key: "8", label: "Orders", iconName: "BookOutlined", route: "/orders" },
    { key: "9", label: "Users", iconName: "ContactsOutlined", route: "/users" },
    {
      key: "10",
      label: "Products",
      iconName: "AppstoreOutlined",
      route: "/products",
    },
    {
      key: "11",
      label: "All Categories",
      iconName: "GroupOutlined",
      route: "/categories",
    },
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
          <div style="display: flex; align-items: center">
            <!-- <{{ item.iconName }} /> -->
            <component :is="item.iconName" />
            {{ item.label }}
          </div>
        </NuxtLink>
      </a-menu-item>

      <a-menu-item>
        <v-btn @click="logout()">
          <div style="display: flex; align-items: center">
            <LogoutIcon />
            Logout
          </div>
        </v-btn>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
