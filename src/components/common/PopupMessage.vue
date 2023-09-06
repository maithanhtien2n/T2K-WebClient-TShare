<script setup>
import { StoreApp } from "@/services/stores";
import { ref, watch } from "vue";

const { onGetterPopupMessage } = StoreApp();

const display = ref(false);

watch(
  () => onGetterPopupMessage.value.content,
  (value) => {
    display.value = true;
  }
);
</script>

<template>
  <Dialog
    v-model:visible="display"
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

      <ProgressSpinner
        v-if="onGetterPopupMessage?.status === null"
        style="width: 30px; height: 30px"
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />

      <span class="line-height-3 text-center">{{
        onGetterPopupMessage?.content
      }}</span>
    </div>
  </Dialog>
</template>
