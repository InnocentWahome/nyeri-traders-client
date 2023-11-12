<script lang="ts" setup>
import { reactive } from "vue";

interface FormState {
  product_id: number;
  buyer_id: number;
  cost: number;
  quantity: number;
  payment_status: boolean;
  dispatch_status: boolean;
  delivery_status: boolean;
}

const formState = reactive<FormState>({
  product_id: 0,
  buyer_id: 0,
  cost: 0,
  quantity: 0,
  payment_status: false,
  dispatch_status: false,
  delivery_status: false,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Product"
      name="product_id"
    >
      <a-input v-model:value="formState.product_id" />
    </a-form-item>

    <a-form-item
      label="Buyer"
      name="buyer_id"
    >
      <a-input v-model:value="formState.buyer_id" />
    </a-form-item>

    <a-form-item
      label="Cost"
      name="cost"
    >
      <a-input v-model:value="formState.cost" />
    </a-form-item>

    <a-form-item
      label="Quantity"
      name="quantity"
    >
     <a-input v-model:value="formState.quantity" />
    </a-form-item>

    <a-form-item
      label="Payment status"
      name="payment_status"
    >
     <a-input v-model:value="formState.payment_status" />
    </a-form-item>

    <a-form-item
      label="Dispatch status"
      name="dispatch_status"
    >
     <a-input v-model:value="formState.dispatch_status" />
    </a-form-item>

    <a-form-item
      label="Delivery status"
      name="delivery_status"
    >
     <a-input v-model:value="formState.delivery_status" />
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
