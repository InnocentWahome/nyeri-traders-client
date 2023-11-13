<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

definePageMeta({
  layout: "default",
});

const userId = useCookie('user_id')

const products = ref();

const getSellerProducts = await useApi(`/product/seller${userId.value}`, {
  method: "GET",
});

products.value = getSellerProducts?.data;

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

const showEditProduct = ref<boolean>(false);

const showDeleteProduct = ref<boolean>(false);

const openEditProduct = (product_id: string | number) => {
  showEditProduct.value = true;
  console.log("product", product_id);
};

const openDeleteProduct = (
  product_id: string | number
) => {
  showDeleteProduct.value = true;
  console.log("product", product_id);
};

const saveEditedProduct = () => {
  showEditProduct.value = false;
};
</script>

<template>
  <div>
    <h1>Here are all your products</h1>
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
          <v-img
            :src="record.image"
            style="border-radius: 50%; height: 50px; width: 50px"
          />
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
          <DeleteOutlined
            style="cursor: pointer"
            @click="openDeleteProduct(record.id)"
          />
          <a-divider type="vertical" />
          <EditOutlined
            style="cursor: pointer"
            @click="openEditProduct(record.id)"
          />
        </template>
      </template>
    </a-table>

    <!-- ---------------------------------------------- -->
    <!--Edit product -->
    <!-- ---------------------------------------------- -->
    <a-drawer
      title="Edit product"
      :open="showEditProduct"
      @close="saveEditedProduct"
    >
      <FormsProductForm />
    </a-drawer>
    <!-- ---------------------------------------------- -->
    <!--Delete product modal -->
    <!-- ---------------------------------------------- -->
    <a-drawer
      title="Delete product"
      :open="showDeleteProduct"
      :footer-style="{ textAlign: 'right' }"
      @close="showDeleteProduct = false"
    >
      <p>Do you want to delete this product?</p>
      <a-space>
        <a-button @click="showDeleteProduct = false">Cancel</a-button>
        <a-button type="primary" @click="showDeleteProduct = false"
          >Submit</a-button
        >
      </a-space>
    </a-drawer>
  </div>
</template>
