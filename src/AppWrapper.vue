<script setup>
import PopupMessage from "@/components/common/PopupMessage.vue";
import LoadingActive from "@/components/common/LoadingActive.vue";
</script>
<template>
  <router-view />

  <!-- Thông báo -->
  <PopupMessage />

  <!-- Loading -->
  <LoadingActive />
</template>
