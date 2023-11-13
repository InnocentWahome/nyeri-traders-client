<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

definePageMeta({
  layout: "default",
});

const userId = useCookie('user_id')

const orders = ref();

const getAllOrders = await useApi(`/order/buyers-orders/${userId.value}`, {
  method: "GET",
});

orders.value = getAllOrders?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50
  },
  {
    title: "Buyer",
    dataIndex: "buyer_id",
    key: "buyer_id",
    resizable: true,
    width: 200
  },
  {
    title: "Seller",
    dataIndex: "seller_id",
    key: "seller_id",
    resizable: true,
    width: 200
  },
  {
    title: "Product",
    dataIndex: "product_id",
    key: "product_id",
    resizable: true,
    width: 200
  },
  {
    title: "Payment status",
    dataIndex: "payment_status",
    key: "payment_status",
    resizable: true,
    width: 100
  },
  {
    title: "Dispatch status",
    dataIndex: "dispatch_status",
    key: "dispatch_status",
    resizable: true,
    width: 100
  },
  {
    title: "Delivery status",
    dataIndex: "delivery_status",
    key: "delivery_status",
    resizable: true,
    width: 100
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

const showEditOrder = ref<boolean>(false);

const showDeleteOrder = ref<boolean>(false);

const openEditOrder = (order_id: string | number) => {
  showEditOrder.value = true;
  console.log("order", order_id);
};

const openDeleteOrder = (
  order_id: string | number
) => {
  showDeleteOrder.value = true;
  console.log("order", order_id);
};

const saveEditedOrder = () => {
  showEditOrder.value = false;
};
</script>

<template>
  <div>
    <h1>Here are all the orders you have placed</h1>
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
          <DeleteOutlined style="cursor: pointer"

          @click="openDeleteOrder(record.id)"

          />
          <a-divider type="vertical" />
          <EditOutlined style="cursor: pointer"

          @click="openEditOrder(record.id)"
/>
        </template>
      </template>
    </a-table>



    <!-- ---------------------------------------------- -->
    <!--Edit order -->
    <!-- ---------------------------------------------- -->
    <a-drawer
      title="Edit order"
      :open="showEditOrder"
      @close="saveEditedOrder"
    >
      <FormsOrderForm />
    </a-drawer>
    <!-- ---------------------------------------------- -->
    <!--Delete order modal -->
    <!-- ---------------------------------------------- -->
    <a-drawer
      title="Delete order"
      :open="showDeleteOrder"
      :footer-style="{ textAlign: 'right' }"
      @close="showDeleteOrder = false"
    >
      <p>Do you want to delete this order?</p>
      <a-space>
        <a-button @click="showDeleteOrder = false">Cancel</a-button>
        <a-button type="primary" @click="showDeleteOrder = false"
          >Submit</a-button
        >
      </a-space>
    </a-drawer>
  </div>
</template>
