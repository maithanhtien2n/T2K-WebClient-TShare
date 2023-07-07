<script setup>
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <div>
    <TheHeader />

    <div class="container-body px-8 bg-light-blue">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 800px) {
  .container-body {
    padding-left: 0 !important;
    padding-right: 0 !important;
    /* padding-top: 8.5rem !important; */
  }
}
</style>
