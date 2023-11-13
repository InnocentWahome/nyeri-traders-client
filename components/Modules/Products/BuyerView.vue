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
</script>

<template>
  <div>
    <h1>Here are all the products in the system</h1>

    <v-row>
      <v-col
        cols="12"
        lg="4"
        md="4"
        sm="6"
        xs="12"
        v-for="product in products"
        :key="product.id"
      >
        <v-card elevation="10" rounded="xl" height="400" style="border-radius: 16px; ">
          <v-card-text >
            <v-img :src="product.image" />
            <h1  style="display: flex; text-align: center;">{{ product.name }}</h1>
            <p style="height: 50px;">{{ product.description }}</p>

            <v-btn color="primary">ORDER</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
