<script setup>
import { reactive, toRef } from "vue";
import { appLocalStorage } from "@/utils";
import { StoreApp } from "@/services/stores";

const { onActionCommentPosts } = StoreApp();

const { user_info } = appLocalStorage();

const props = defineProps({
  commentInfo: {
    type: Array,
    required: false,
    default: () => {},
  },

  postId: {
    type: Number,
    required: true,
    default: null,
  },
});

const emits = defineEmits(["onEmitUpdateListPosts"]);

const commentInfo = toRef(props, "commentInfo");
const posts_id = toRef(props, "postId");

const data = reactive({
  commentContent: "",
  display: false,
});

const onClickOpenComment = () => {
  data.display = true;
};

const onClickSendCommentPosts = async () => {
  const res = await onActionCommentPosts({
    posts_id: posts_id.value,
    user_id: user_info.user_id,
    comment_content: data.commentContent,
  });

  if (res) emits("onEmitUpdateListPosts");
  data.commentContent = "";
};
</script>

<template>
  <div
    @click="onClickOpenComment"
    class="unselectable on-click-2 px-3 py-2 border-round-2xl cursor-pointer border-1 text-400"
  >
    <span class="text-700">Bình luận</span>
  </div>

  <Dialog
    v-model:visible="data.display"
    modal
    header="Đáng giá 1$"
    class="w-30rem"
  >
    <div class="flex flex-column gap-3 h-20rem">
      <div v-for="(cmt, index) in commentInfo" :key="index" class="flex gap-2">
        <UserItem :userAvatar="cmt?.user_info?.avatar_user" />

        <label
          class="flex flex-column line-height-2 bg-black-alpha-10 p-2 border-round-2xl"
        >
          <span class="font-bold">{{ cmt?.user_info?.full_name }}</span>
          <div class="flex align-items-center gap-1">
            <span class="text-600">{{ cmt?.comment_content }}</span>
          </div>
        </label>
      </div>

      <div
        v-if="commentInfo?.length < 1"
        class="w-full h-full flex justify-content-center align-items-center text-600"
      >
        Chưa có bình luận nào.
      </div>
    </div>

    <template #footer>
      <div
        style="padding: 1rem"
        class="w-full mt-3 box-shadow-1 flex align-items-center bg-light-blue border-round-3xl gap-2"
      >
        <input
          v-model="data.commentContent"
          class="w-full border-none bg-transparent outline-none"
          type="text"
          placeholder="Hãy viết bình luận"
          @keydown.enter="onClickSendCommentPosts"
        />

        <i
          @click="onClickSendCommentPosts"
          :class="{ 'p-disabled': !data.commentContent }"
          class="pi pi-send on-click-3 cursor-pointer"
        />
      </div>
    </template>
  </Dialog>
</template>
