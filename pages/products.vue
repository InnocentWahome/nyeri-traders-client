<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

definePageMeta({
  layout: "default",
});

const products = ref();

const getAllProductsResponse = await useApi("/product", {
  method: "GET",
});

products.value = getAllProductsResponse?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 0,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    resizable: true,
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    resizable: true,
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    ellipsis: true,
    width: 400,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    resizable: true,
    width: 100,
  },
  {
    title: "Stock quantity",
    dataIndex: "quantity",
    key: "quantity",
    resizable: true,
    width: 150,
  },
  {
    title: "Seller",
    dataIndex: "seller_id",
    key: "seller_id",
    resizable: true,
    width: 150,
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
  <!-- {{ products }} -->
  <div>
    <a-table
      :dataSource="products"
      :columns="columns"
      bordered
      @resizeColumn="handleResizeColumn"
      :scroll="{ x: 2000 }"
      :expand-column-width="100"
    >
      <template #bodyCell="{ column, record }">
        <!-- Image -->
        <template v-if="column.key === 'image'">
          <v-img :src="record.image" style="border-radius: 50%; height: 50px; width: 50px;" />
        </template>

        <!-- Seller -->
        <template
          v-if="
            column.key === 'seller_id' &&
            record.seller.id &&
            record.seller.id !== 0
          "
        >
          <span
            >({{ record.seller.id }}) {{ record.seller.firstName }}
            {{ record.seller.lastName }}
          </span>
        </template>

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
