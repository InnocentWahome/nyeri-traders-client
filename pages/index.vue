<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

definePageMeta({
  layout: "default",
});

const orders = ref();

const getAllOrders = await useApi("/order", {
  method: "GET",
});

orders.value = getAllOrders?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
  },
  {
    title: "Buyer",
    dataIndex: "buyer_id",
    key: "buyer_id",
    resizable: true,
  },
  {
    title: "Seller",
    dataIndex: "seller_id",
    key: "seller_id",
    resizable: true,
  },
  {
    title: "Product",
    dataIndex: "product_id",
    key: "product_id",
    resizable: true,
  },
  {
    title: "Payment status",
    dataIndex: "payment_status",
    key: "payment_status",
    resizable: true,
  },
  {
    title: "Dispatch status",
    dataIndex: "dispatch_status",
    key: "dispatch_status",
    resizable: true,
  },
  {
    title: "Delivery status",
    dataIndex: "delivery_status",
    key: "delivery_status",
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
      :dataSource="orders"
      :columns="columns"
      bordered
      @resizeColumn="handleResizeColumn"
      :scroll="{ x: 2000 }"
      :expand-column-width="100"
    >
      <template #bodyCell="{ column, record }">
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

        <!-- Buyer -->
        <template
          v-if="
            column.key === 'buyer_id' &&
            record.buyer.id &&
            record.buyer.id !== 0
          "
        >
          <span
            >({{ record.buyer.id }}) {{ record.buyer.firstName }}
            {{ record.buyer.lastName }}
          </span>
        </template>

        <!-- Product -->
        <template
          v-if="
            column.key === 'product_id' &&
            record.product.id &&
            record.product.id !== 0
          "
        >
          <span>({{ record.product.id }}) {{ record.product.name }} </span>
        </template>

        <!-- Payment status  -->
        <template v-if="column.key === 'payment_status'">
          <span v-if="record.payment_status === 1">
            <a-tag color="success"> Paid </a-tag>
          </span>
          <span v-else>
            <a-tag color="error">Not paid</a-tag>
          </span>
        </template>

        <!-- Dispatch status  -->
        <template v-if="column.key === 'dispatch_status'">
          <span v-if="record.dispatch_status === 1">
            <a-tag color="success"> Dispatched </a-tag>
          </span>
          <span v-else>
            <a-tag color="error">Not dispatched</a-tag>
          </span>
        </template>

        <!-- Delivery status  -->
        <template v-if="column.key === 'delivery_status'">
          <span v-if="record.delivery_status === 1">
            <a-tag color="success"> Delivered </a-tag>
          </span>
          <span v-else>
            <a-tag color="error">Not delivered</a-tag>
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
