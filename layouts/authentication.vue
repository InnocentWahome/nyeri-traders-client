<template>
  <v-app>
    <v-main class="fill-height">
      <v-container class="h-100" style="padding: 0px !important; height: 100% !important;">
        <section style="height: 100% !important;">
          <v-row style="height: 100% !important; display: flex; justify-content: center !important; align-items: center !important;">
            <v-col cols="auto">
              <slot />
            </v-col>
          </v-row>
        </section>
      </v-container>
    </v-main>
  </v-app>
</template>
