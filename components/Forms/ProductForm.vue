<script lang="ts" setup>
import { reactive } from "vue";

interface FormState {
  name: string;
  description: string;
  image: string;
  quantity: string;
  price: string;
  seller_id: string;
}

const formState = reactive<FormState>({
  name: "",
  description: "",
  image: '',
  quantity: '',
  price: '',
  seller_id: ''
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
      label="Name"
      name="name"
      :rules="[{ required: true, message: 'Please input your name!' }]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item
      label="Description"
      name="description"
      :rules="[{ required: true, message: 'Please input your description!' }]"
    >
      <a-input v-model:value="formState.description" />
    </a-form-item>

    <a-form-item
      label="Image"
      name="image"
      :rules="[{ required: true, message: 'Please input your image!' }]"
    >
      <a-input v-model:value="formState.image" />
    </a-form-item>

    <a-form-item
      label="Quantity"
      name="quantity"
      :rules="[{ required: true, message: 'Please input your quantity!' }]"
    >
      <a-input v-model:value="formState.quantity" />
    </a-form-item>

    <a-form-item
      label="Price"
      name="price"
      :rules="[{ required: true, message: 'Please input your price!' }]"
    >
      <a-input v-model:value="formState.price" />
    </a-form-item>

    <a-form-item
      label="Seller"
      name="seller_id"
      :rules="[{ required: true, message: 'Please input your seller_id!' }]"
    >
      <a-input v-model:value="formState.seller_id" />
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
