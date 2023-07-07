<script setup>
import DATA from "../services/data.js";
import { reactive } from "vue";

const data = reactive({
  commentContent: "",
  display: false,
});

const onClickOpenComment = () => {
  data.display = true;
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
    <div class="flex flex-column gap-3">
      <div
        v-for="(item, index) in DATA.comments"
        :key="index"
        class="flex gap-2"
      >
        <img
          class="avatar object-fit-cover on-click"
          :src="item.userAvatar"
          alt=""
        />

        <label
          class="flex flex-column line-height-2 bg-black-alpha-10 p-2 border-round-2xl"
        >
          <span class="font-bold">{{ item.userName }}</span>
          <div class="flex align-items-center gap-1">
            <span class="text-600">{{ item.commentInfo }}</span>
          </div>
        </label>
      </div>
    </div>

    <template #footer>
      <div
        style="padding: 1rem"
        class="w-full mt-3 box-shadow-1 flex align-items-center bg-light-blue border-round-3xl gap-2 cursor-pointer"
      >
        <input
          class="w-full border-none bg-transparent outline-none cursor-pointer"
          type="text"
          placeholder="Hãy viết bình luận"
        />

        <i class="pi pi-send on-click-3" />
      </div>
    </template>
  </Dialog>
</template>
