<script setup>
import { StoreApp } from "@/services/stores";

const { onGetterPopupMessage } = StoreApp();
</script>

<template>
  <Dialog
    v-model:visible="onGetterPopupMessage.display"
    modal
    header="Thông báo"
    :style="{ width: '30rem' }"
  >
    <div
      class="flex flex-column justify-content-center align-items-center gap-3 mb-6"
    >
      <i
        v-if="onGetterPopupMessage?.status === 1"
        style="color: #00a344"
        class="pi pi-check-circle text-3xl"
      />

      <i
        v-if="onGetterPopupMessage?.status === 0"
        style="color: #d10000"
        class="pi pi-exclamation-circle text-3xl"
      />

      <span class="line-height-3 text-center">{{
        onGetterPopupMessage?.content
      }}</span>
    </div>
  </Dialog>
</template>
