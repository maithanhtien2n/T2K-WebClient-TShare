<script setup>
import { reactive, toRef } from "vue";

const props = reactive({
  display: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const display = toRef(props, "display");
</script>

<template>
  <div
    v-if="display"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black-alpha-50"
    @click="display = false"
  ></div>
</template>
