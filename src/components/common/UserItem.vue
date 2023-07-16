<script setup>
const props = defineProps({
  userAvatar: {
    type: String,
    required: false,
    default: null,
  },

  fullName: {
    type: String,
    required: false,
    default: null,
  },

  content: {
    type: String,
    required: false,
    default: null,
  },

  icon: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<template>
  <div class="flex gap-2">
    <img
      class="avatar object-fit-cover on-click cursor-pointer box-shadow-1"
      :src="
        props?.userAvatar
          ? props?.userAvatar
          : 'https://trinhvantuyen.com/wp-content/uploads/2022/03/avatar-nam.jpg'
      "
      alt=""
    />

    <label v-if="props?.fullName" class="flex flex-column gap-1">
      <span class="font-bold cursor-pointer on-click unselectable text-900">
        {{ props?.fullName }}
      </span>

      <div v-if="props?.content" class="flex align-items-center gap-1 w-full">
        <span style="font-size: 0.8rem" class="text-600 block">
          {{ props?.content }}
        </span>

        <i v-if="props?.icon" style="font-size: 0.7rem" :class="props?.icon" />
      </div>

      <slot />
    </label>
  </div>
</template>
