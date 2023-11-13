<script lang="ts" setup>
const { register, registerFormState } = useAuthentication();

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <a-form
    :model="registerFormState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="First Name"
      name="firstName"
      :rules="[{ required: true, message: 'Please input your firstName!' }]"
    >
      <a-input v-model:value="registerFormState.firstName" />
    </a-form-item>

    <a-form-item
      label="Last name"
      name="lastName"
      :rules="[{ required: true, message: 'Please input your lastName!' }]"
    >
      <a-input v-model:value="registerFormState.lastName" />
    </a-form-item>

    <a-form-item
      label="Phone number"
      name="phoneNumber"
      :rules="[{ required: true, message: 'Please input your phoneNumber!' }]"
    >
      <a-input v-model:value="registerFormState.phoneNumber" />
    </a-form-item>

    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="registerFormState.email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="registerFormState.password" />
    </a-form-item>

    <a-form-item label="Select">
      <a-select v-model:value="registerFormState.role">
        <a-select-option value="Buyer">Buyer</a-select-option>
        <a-select-option value="Seller">Seller</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" @click="register()">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
