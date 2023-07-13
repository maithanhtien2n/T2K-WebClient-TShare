<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  avatar: {
    type: String,
    required: false,
    default: null,
  },
});

const data = reactive({
  avatarFile: "",
  avatarPreview: "",
  displayOption: false,
  displayBg: false,
  popupAvatarPreview: false,
});

const onClickOptionAvatar = () => {
  data.displayOption = true;
  data.displayBg = true;
};

const onClickRemovePopup = () => {
  data.displayOption = false;
  data.displayBg = false;
};

const onUploadFile = (e, previewFile, sendfile) => {
  data.loadingFile = true;
  data.popupAvatarPreview = true;
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = (event) => {
    data[`${previewFile}`] = event.target.result;
    data[`${sendfile}`] = e.target.files[0];
    if (data.avatarPreview) {
      data.loadingFile = false;
    }
  };
};

const onClickRemoveFile = (previewFile, sendfile) => {
  data[`${previewFile}`] = "";
  data.formUploadPosts[`${sendfile}`] = "";
};
</script>

<template>
  <Dialog
    v-model:visible="data.popupAvatarPreview"
    modal
    header="Cập nhật ảnh đại diện"
    class="w-25rem"
  >
    <div class="w-15rem h-15rem m-auto">
      <img
        class="w-full h-full border-circle object-fit-cover border-dashed border-1 text-main-color"
        :src="data.avatarPreview"
        alt=""
      />
    </div>

    <template #footer>
      <Button label="Bỏ qua" class="p-button-outlined" @click="onClickSkip" />
      <Button label="Lưu" @click="onClickUpdateNewAvatar" />
    </template>
  </Dialog>

  <div class="relative z-5">
    <img
      @click="onClickOptionAvatar"
      style="
        transform: translate(-50%, 50%);
        left: 50%;
        bottom: 0;
        border: 3px solid #fff;
      "
      class="avatar-1 w-11rem h-11rem border-circle on-click absolute box-shadow-1 cursor-pointer"
      :src="
        props?.avatar
          ? props?.avatar
          : 'https://trinhvantuyen.com/wp-content/uploads/2022/03/avatar-nam.jpg'
      "
      alt=""
    />

    <div
      v-if="data.displayOption"
      style="top: 3rem; left: 50%; transform: translateX(-50%)"
      class="flex flex-column overflow-hidden border-round-lg bg-white box-shadow-2 absolute z-5"
    >
      <span
        @click="onClickRemovePopup"
        class="option-avatar cursor-pointer p-3 on-click unselectable"
        >Xem ảnh đại diện</span
      >

      <span
        @click="onClickRemovePopup"
        class="option-avatar relative cursor-pointer p-3 on-click unselectable"
      >
        Thay đổi ảnh đại diện

        <input
          type="file"
          class="absolute left-0 top-0 right-0 bottom-0 opacity-0"
          @change="onUploadFile($event, 'avatarPreview', 'avatarFile')"
        />
      </span>
    </div>
  </div>

  <div
    v-if="data.displayBg"
    class="fixed top-0 left-0 right-0 bottom-0"
    @click="onClickRemovePopup"
  ></div>
</template>

<style scoped>
.option-avata {
  transition: all 0.2s ease;
}

.option-avatar:hover {
  background: #ddd;
}
</style>
