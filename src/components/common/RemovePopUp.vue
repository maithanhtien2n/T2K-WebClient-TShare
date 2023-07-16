<script setup>
import { toRef } from "vue";

const props = defineProps({
  display: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["onEmitRemovePopup"]);

const display = toRef(props, "display");
</script>

<template>
  <div
    v-if="display"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black-alpha-30 z-1"
    @click="emit('onEmitRemovePopup')"
  ></div>
</template>
