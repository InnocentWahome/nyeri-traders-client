<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

definePageMeta({
  layout: "default",
});

const users = ref();

const getAllUsersResponse = await useApi("/auth/users", {
  method: "GET",
});

users.value = getAllUsersResponse?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    resizable: true,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    resizable: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    resizable: true,
    ellipsis: true,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    resizable: true,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
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

const showEditProduct = ref<boolean>(false);

const showDeleteProduct = ref<boolean>(false);

const openEditProduct = (product_id: string | number) => {
  showEditProduct.value = true;
  console.log("product", product_id);
};

const openDeleteProduct = (product_id: string | number) => {
  showDeleteProduct.value = true;
  console.log("product", product_id);
};

const saveEditedProduct = () => {
  showEditProduct.value = false;
};
</script>

<template>
  <div>
    <h1>Here are all the users in the system</h1>
    <a-table
      :dataSource="users"
      :columns="columns"
      bordered
      @resizeColumn="handleResizeColumn"
      :scroll="{ x: 2000 }"
      :expand-column-width="100"
    >
      <template #bodyCell="{ column, record }">
        <!-- User Roles -->
        <template v-if="column.key === 'role'">
          <span v-if="record.role === 'Buyer'">
            <a-tag color="success"> Buyer </a-tag>
          </span>
          <span v-else>
            <a-tag color="error">Seller</a-tag>
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
      title="Edit user"
      :open="showEditProduct"
      @close="saveEditedProduct"
    >
      <FormsAuthenticationRegisterForm />
    </a-drawer>
    <!-- ---------------------------------------------- -->
    <!--Delete product modal -->
    <!-- ---------------------------------------------- -->
    <a-drawer
      title="Delete user"
      :open="showDeleteProduct"
      :footer-style="{ textAlign: 'right' }"
      @close="showDeleteProduct = false"
    >
      <p>Do you want to delete this user?</p>
      <a-space>
        <a-button @click="showDeleteProduct = false">Cancel</a-button>
        <a-button type="primary" @click="showDeleteProduct = false"
          >Submit</a-button
        >
      </a-space>
    </a-drawer>
  </div>
</template>
