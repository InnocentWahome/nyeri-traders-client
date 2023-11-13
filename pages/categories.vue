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
    width: 50
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    resizable: true,
    width: 300
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    width: 600,
    ellipsis: true
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

const showEditCategory = ref<boolean>(false);

const showDeleteCategory = ref<boolean>(false);

const openEditCategory = (category_id: string | number) => {
  showEditCategory.value = true;
  console.log("category", category_id);
};

const openDeleteCategory = (category_id: string | number) => {
  showDeleteCategory.value = true;
  console.log("category", category_id);
};

const saveEditedCategory = () => {
  showEditCategory.value = false;
};
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
      <template #bodyCell="{ column, record }">
        <!-- Actions -->
        <template v-if="column.key === 'action'">
          <DeleteOutlined
            style="cursor: pointer"
            @click="openDeleteCategory(record.id)"
          />
          <a-divider type="vertical" />
          <EditOutlined
            style="cursor: pointer"
            @click="openEditCategory(record.id)"
          />
        </template>
      </template>
    </a-table>

    <!-- ---------------------------------------------- -->
    <!--Edit category -->
    <!-- ---------------------------------------------- -->
    <a-drawer
      title="Edit category"
      :open="showEditCategory"
      @close="saveEditedCategory"
    >
      <FormsCategoriesForm />
    </a-drawer>
    <!-- ---------------------------------------------- -->
    <!--Delete category modal -->
    <!-- ---------------------------------------------- -->
    <a-drawer
      title="Delete category"
      :open="showDeleteCategory"
      :footer-style="{ textAlign: 'right' }"
      @close="showDeleteCategory = false"
    >
      <p>Do you want to delete this category?</p>
      <a-space>
        <a-button @click="showDeleteCategory = false">Cancel</a-button>
        <a-button type="primary" @click="showDeleteCategory = false"
          >Submit</a-button
        >
      </a-space>
    </a-drawer>
  </div>
</template>
