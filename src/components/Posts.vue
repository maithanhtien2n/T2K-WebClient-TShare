<script setup>
import { toRef } from "vue";
import Comment from "../views/home/components/Comment.vue";

const props = defineProps({
  postsContentInfo: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const postsContentInfo = toRef(props, "postsContentInfo");
</script>

<template>
  <div class="card flex flex-column gap-3">
    <!-- Header card -->
    <div class="flex justify-content-between">
      <div class="flex gap-2">
        <img
          class="avatar object-fit-cover on-click"
          :src="postsContentInfo?.userAvatar"
          alt=""
        />

        <label class="flex flex-column gap-2">
          <span class="font-bold">{{ postsContentInfo?.userName }}</span>
          <div class="flex align-items-center gap-1">
            <span style="font-size: 0.8rem" class="text-600">{{
              postsContentInfo?.postsDate
            }}</span>
            <i style="font-size: 0.7rem" class="pi pi-globe" />
          </div>
        </label>
      </div>

      <div
        class="dot border-circle w-2rem h-2rem flex justify-content-center align-items-center cursor-pointer on-click"
      >
        <i class="pi pi-ellipsis-h" />
      </div>
    </div>

    <!-- Body card -->
    <div class="w-full flex flex-column gap-2 border-bottom-1 pb-3 text-400">
      <span class="text-800">{{ postsContentInfo?.postsContent }}</span>

      <img
        class="body-card-img w-full h-24rem object-fit-cover"
        :src="postsContentInfo?.postsFile"
        alt=""
      />

      <div class="flex justify-content-between px-3">
        <label class="flex align-items-center gap-2" for="Số lượt like">
          <span class="text-600"
            >Đáng giá {{ postsContentInfo?.likeAmount }}$</span
          >
        </label>

        <label class="flex align-items-center gap-2" for="Số lượt comment">
          <span class="text-600"
            >{{ postsContentInfo?.commentAmount }} bình luận</span
          >
        </label>

        <label class="flex align-items-center gap-2" for="Số lượt share">
          <span class="text-600"
            >{{ postsContentInfo?.shareAmount }} chia sẻ</span
          >
        </label>
      </div>
    </div>

    <!-- Footer card -->
    <div class="flex align-items-center justify-content-between">
      <div
        class="unselectable on-click flex align-items-center gap-1 w-5rem py-2 border-round-2xl flex justify-content-center align-items-center bg-main-color cursor-pointer"
      >
        <span style="color: #fff">Tặng</span>
        <i style="font-size: 0.8rem; color: #fff" class="pi pi-dollar" />
      </div>

      <Comment />

      <div
        class="unselectable on-click-2 px-3 py-2 border-round-2xl cursor-pointer border-1 text-400"
      >
        <span class="text-700">Chia sẻ</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dot {
  transition: all 0.1s ease;
}
.dot:hover {
  background: var(--blueLight);
}

@media only screen and (max-width: 800px) {
  .body-card-img {
    height: 17rem !important;
  }
}
</style>
