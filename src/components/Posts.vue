<script setup>
import { toRef } from "vue";
import Comment from "./Comment.vue";
import { appLocalStorage, formatDate } from "@/utils";
import { StoreApp } from "@/services/stores";

const { onActionLikePosts } = StoreApp();

const { user_info } = appLocalStorage();

const props = defineProps({
  postsContentInfo: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const emits = defineEmits(["onEmitUpdateListPosts"]);

const postsContentInfo = toRef(props, "postsContentInfo");

const onClickLikePosts = async (posts_id, user_id) => {
  const res = await onActionLikePosts({ posts_id, user_id });

  if (res) emits("onEmitUpdateListPosts");
};

const onEmitUpdateListPosts = () => {
  emits("onEmitUpdateListPosts");
};
</script>

<template>
  <div class="w-full card flex flex-column gap-3">
    <!-- Header card -->
    <div class="flex justify-content-between">
      <UserItem
        :userAvatar="postsContentInfo?.poster_info?.avatar_user"
        :fullName="postsContentInfo?.poster_info?.full_name"
        :content="formatDate(postsContentInfo?.created_date)"
        :icon="'pi pi-globe'"
      />

      <div
        class="dot border-circle w-2rem h-2rem flex justify-content-center align-items-center cursor-pointer on-click"
      >
        <i class="pi pi-ellipsis-h" />
      </div>
    </div>

    <!-- Body card -->
    <div class="w-full flex flex-column gap-2 border-bottom-1 pb-3 text-400">
      <span
        v-html="postsContentInfo?.posts_content"
        :class="{
          'p-3 bg-main-color text-white border-round-2xl':
            !postsContentInfo?.posts_file,
        }"
        class="text-800"
      ></span>

      <video
        v-if="
          postsContentInfo?.type_file === 'video' &&
          postsContentInfo?.posts_file
        "
        class="body-card-img w-full h-24rem border-1 bg-black-alpha-90"
        controls
      >
        <source :src="postsContentInfo?.posts_file" type="video/mp4" />
      </video>

      <img
        v-if="
          postsContentInfo?.type_file === 'image' &&
          postsContentInfo?.posts_file
        "
        class="body-card-img w-full h-24rem object-fit-cover"
        :src="postsContentInfo?.posts_file"
        alt=""
      />

      <div class="flex justify-content-between px-3">
        <label class="flex align-items-center gap-2" for="Số lượt like">
          <span class="text-600"
            >Đáng giá {{ postsContentInfo?.list_like?.length }}$</span
          >
        </label>

        <label class="flex align-items-center gap-2" for="Số lượt comment">
          <span class="text-600"
            >{{ postsContentInfo?.list_comment?.length }} bình luận</span
          >
        </label>

        <label class="flex align-items-center gap-2" for="Số lượt share">
          <span class="text-600">100 chia sẻ</span>
        </label>
      </div>
    </div>

    <!-- Footer card -->
    <div class="flex align-items-center justify-content-between">
      <div
        @click="onClickLikePosts(postsContentInfo.posts_id, user_info.user_id)"
        :class="{
          'bg-main-color': postsContentInfo?.list_like?.filter(
            ({ user_id }) => user_id === user_info.user_id
          )[0],
        }"
        class="unselectable flex align-items-center gap-1 on-click-2 px-3 py-2 border-round-2xl cursor-pointer border-1 text-400"
      >
        <span
          :class="{
            'text-white': postsContentInfo?.list_like?.filter(
              ({ user_id }) => user_id === user_info.user_id
            )[0],
          }"
          class="text-700"
          >Tặng</span
        >
        <i
          :class="{
            'text-white': postsContentInfo?.list_like?.filter(
              ({ user_id }) => user_id === user_info.user_id
            )[0],
          }"
          style="font-size: 0.8rem"
          class="pi pi-dollar text-700"
        />
      </div>

      <Comment
        :commentInfo="postsContentInfo?.list_comment"
        :postId="+postsContentInfo?.posts_id"
        @onEmitUpdateListPosts="onEmitUpdateListPosts"
      />

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
