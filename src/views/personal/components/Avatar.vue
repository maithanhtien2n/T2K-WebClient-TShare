<script setup>
import { reactive } from "vue";
import { StoreApp, STORE_PERSONAL } from "@/services/stores";
import { useRoute } from "vue-router";

const { onActionActivePopupMessage, onActionGetUserInfo } = StoreApp();
const { onActionUpdateAvatar, onActionGetUserPersonalInfo } =
  STORE_PERSONAL.StorePersonal();

const ROUTE = useRoute();

const props = defineProps(["info", "updateAvatar"]);

const formData = new FormData();

const data = reactive({
  avatarFile: "",
  avatarPreview: "",
  displayOption: false,
  displayBg: false,
  popupAvatarPreview: false,
  openImagePreview: false,
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
  data.popupAvatarPreview = true;
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = (event) => {
    data[`${previewFile}`] = event.target.result;
  };
  data[`${sendfile}`] = e.target.files[0];
};

const onClickRemoveFile = (previewFile, sendfile) => {
  data[`${previewFile}`] = "";
  data[`${sendfile}`] = "";
  data.popupAvatarPreview = false;
};

const onClickUpdateNewAvatar = async () => {
  onActionActivePopupMessage(null, "Đang cập nhật...");
  data.popupAvatarPreview = false;

  formData.set("user_id", props.info.user_id);
  formData.set("avatar_user", data.avatarFile);

  const res = await onActionUpdateAvatar(formData);

  if (res) await onActionGetUserInfo(props.info.account_id);
  onActionGetUserPersonalInfo(ROUTE.params.username);
  onActionActivePopupMessage(1, "Cập nhật ảnh đại diện thành công!");
};
</script>

<template>
  <Dialog
    v-model:visible="data.popupAvatarPreview"
    modal
    header="Xem trước ảnh đại diện"
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
      <Button
        label="Bỏ qua"
        class="p-button-outlined"
        @click="onClickRemoveFile"
      />
      <Button label="Lưu" @click="onClickUpdateNewAvatar" />
    </template>
  </Dialog>

  <div class="relative z-">
    <div>
      <img
        @click="onClickOptionAvatar"
        style="
          transform: translate(-50%, 50%);
          left: 50%;
          bottom: 0;
          border: 3px solid #fff;
        "
        class="avatar-1 bg-white w-11rem h-11rem border-circle on-click absolute box-shadow-1 cursor-pointer"
        :src="
          props?.info.avatar
            ? props?.info.avatar
            : 'https://trinhvantuyen.com/wp-content/uploads/2022/03/avatar-nam.jpg'
        "
        alt=""
      />
    </div>

    <div
      v-if="data.displayOption"
      style="top: 4.5rem; left: 50%; transform: translateX(-50%)"
      class="flex flex-column overflow-hidden border-round-lg bg-white box-shadow-2 absolute z-5"
    >
      <span
        @click="
          () => {
            data.openImagePreview = true;
            data.displayOption = false;
            data.displayBg = false;
          }
        "
        class="option-avatar cursor-pointer p-3 on-click unselectable"
        >Xem ảnh đại diện</span
      >

      <span
        v-if="props.updateAvatar"
        @click="onClickRemovePopup"
        class="option-avatar relative cursor-pointer p-3 on-click unselectable"
      >
        Thay đổi ảnh đại diện

        <input
          type="file"
          accept="image/*"
          class="absolute left-0 top-0 right-0 bottom-0 opacity-0"
          @change="onUploadFile($event, 'avatarPreview', 'avatarFile')"
        />
      </span>
    </div>
  </div>

  <div
    v-if="data.displayBg"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black-alpha-30 z-4"
    @click="onClickRemovePopup"
  ></div>

  <Dialog
    v-model:visible="data.openImagePreview"
    modal
    header="Xem ảnh"
    class="w-30rem"
  >
    <img
      class="w-full h-20rem object-fit-cover box-shadow-2 mt-1"
      :src="
        props.info.avatar
          ? props.info.avatar
          : 'https://trinhvantuyen.com/wp-content/uploads/2022/03/avatar-nam.jpg'
      "
      alt=""
    />
  </Dialog>
</template>

<style scoped>
.option-avata {
  transition: all 0.2s ease;
}

.option-avatar:hover {
  background: #ddd;
}

@media only screen and (max-width: 500px) {
  .option-avatar-container {
    position: fixed !important;
    border-radius: 0.5rem 0.5rem 0 0 !important;
    bottom: 0rem !important;
    left: 0rem !important;
    right: 0rem !important;
    transform: translateX(0) !important;
  }
}
</style>
