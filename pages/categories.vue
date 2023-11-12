<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

definePageMeta({
  layout: "default",
});

const categories = ref();

const getAllCategories = await useApi("/categories", {
  method: "GET",
});

categories.value = getAllCategories?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    resizable: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
  },
  {
    title: "Actions",
    key: "action",
    resizable: true,
  },
]);

function handleResizeColumn(w: any, col: any) {
  col.width = w;
}
</script>

<template>
  <div>
    <a-table
      :dataSource="categories"
      :columns="columns"
      bordered
      @resizeColumn="handleResizeColumn"
      :scroll="{ x: 2000 }"
      :expand-column-width="100"
    >
      <template #bodyCell="{ column }">

        <!-- Actions -->
        <template v-if="column.key === 'action'">
          <DeleteOutlined style="cursor: pointer" />
          <a-divider type="vertical" />
          <EditOutlined style="cursor: pointer" />
        </template>
      </template>
    </a-table>
  </div>
</template>
