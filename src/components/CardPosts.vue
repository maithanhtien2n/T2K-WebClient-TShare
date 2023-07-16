<script setup>
import { toRef } from "vue";
import { formatDate } from "@/utils";

const props = defineProps(["postsContentInfo"]);

const postsContentInfo = toRef(props, "postsContentInfo");
</script>

<template>
  <div class="card flex gap-3 flex">
    <div
      class="file-container relative col-4 h-10rem p-0 bg-black-alpha-10 cursor-pointer on-click unselectable"
    >
      <div
        v-if="
          postsContentInfo?.type_file === 'video' &&
          postsContentInfo?.posts_file
        "
      >
        <video class="body-card-img w-full h-full border-1" :controls="false">
          <source :src="postsContentInfo?.posts_file" type="video/mp4" />
        </video>

        <div
          class="absolute bg-black-alpha-50 top-0 bottom-0 left-0 right-0 flex justify-content-center align-items-center"
        >
          <i class="pi pi-play text-2xl text-light-blue" />
        </div>
      </div>

      <img
        v-if="
          postsContentInfo?.type_file === 'image' &&
          postsContentInfo?.posts_file
        "
        class="body-card-img w-full h-full object-fit-cover box-shadow-1"
        :src="postsContentInfo?.posts_file"
        alt=""
      />
    </div>

    <div class="flex-1 flex flex-column gap-2">
      <span class="text-900 font-bold cursor-pointer on-click unselectable">{{
        postsContentInfo?.poster_info?.full_name
      }}</span>
      <span
        class="text-700 line-height-2"
        v-html="postsContentInfo?.posts_content"
      />
      <span class="text-700 line-height-2">{{
        formatDate(postsContentInfo?.created_date)
      }}</span>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .file-container {
    height: 7rem !important;
  }
}
</style>
