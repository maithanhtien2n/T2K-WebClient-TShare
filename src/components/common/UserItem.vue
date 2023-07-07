<script setup>
const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<template>
  <div class="w-full flex gap-2">
    <img
      class="avatar object-fit-cover on-click cursor-pointer"
      :src="userInfo?.userAvatar"
      alt=""
    />

    <label class="flex flex-column gap-1">
      <span class="font-bold cursor-pointer on-click unselectable">{{
        userInfo?.userName
      }}</span>
      <div class="flex align-items-center gap-1 w-full">
        <span style="font-size: 0.8rem" class="text-600 block">{{
          userInfo?.content
        }}</span>
        <i
          v-if="userInfo?.icon"
          style="font-size: 0.7rem"
          :class="userInfo?.icon"
        />
      </div>
    </label>
  </div>
</template>
