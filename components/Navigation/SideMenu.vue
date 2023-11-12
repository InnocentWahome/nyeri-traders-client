<script setup lang="ts">
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DesktopOutlined,
} from "@ant-design/icons-vue";

const selectedKeys1 = ref<string[]>(["1"]);
const selectedKeys2 = ref<string[]>(["2"]);
const selectedKeys3 = ref<string[]>(["3"]);
const selectedKeys4 = ref<string[]>(["4"]);

const openKeys = ref<string[]>(["sub1"]);
</script>

<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      :selectedKeys="selectedKeys2"
      :openKeys="openKeys"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-menu-item key="1">
        <UserOutlined />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <LaptopOutlined />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <desktop-outlined />
        <span>Option 3</span>
      </a-menu-item>
      <a-menu-item key="4">
        <NotificationOutlined />
        <span>Option 4</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
