<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

definePageMeta({
  layout: "default",
});

const categories = ref();

const getAllCategoriesResponse = await useApi("/categories", {
  method: "GET",
});

categories.value = getAllCategoriesResponse?.data;
</script>

<template>
  <div>
    <h1>Here are all the categories in the system</h1>

    <v-row>
      <v-col
        cols="12"
        lg="4"
        md="4"
        sm="6"
        xs="12"
        v-for="category in categories"
        :key="category.id"
      >
        <v-card elevation="10" rounded="xl" height="400" style="border-radius: 16px; ">
          <v-card-text >
            <h1  style="display: flex; text-align: center;">{{ category.name }}</h1>
            <p style="height: 50px;">{{ category.description }}</p>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
