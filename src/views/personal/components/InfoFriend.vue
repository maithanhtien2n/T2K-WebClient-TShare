<script setup>
import { STORE_PERSONAL } from "@/services/stores";

const { onGetterUserPersonalInfo } = STORE_PERSONAL.StorePersonal();
</script>

<template>
  <div v-if="true" class="flex gap-2">
    <Button v-if="false" label="Thêm bạn bè" />

    <Button v-else label="Bạn bè" />

    <Button label="Nhắn tin" class="p-button-outlined" :disabled="false" />
  </div>
</template>
