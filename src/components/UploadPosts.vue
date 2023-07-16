<script setup>
import { reactive } from "vue";
import { appLocalStorage, formatDate } from "@/utils";
import { StoreApp } from "@/services/stores";

const { onGetterUserInfo, onActionActivePopupMessage } = StoreApp();

const { onActionCreateNewPosts } = StoreApp();

const { user_info } = appLocalStorage();

const emits = defineEmits(["onEmitUpdateListPosts"]);

const formData = new FormData();

const data = reactive({
  formUploadPosts: {
    postsContent: "",
    postsFile: "",
  },
  previewFile: "",
  typeFile: "",
  loadingFile: false,
  display: false,
});

const onUploadFile = (e, previewFile, postsFile) => {
  data.loadingFile = true;
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = (event) => {
    data[`${previewFile}`] = event.target.result;
    data.formUploadPosts[`${postsFile}`] = e.target.files[0];
    data[`typeFile`] = e.target.files[0].type.split("/")[0];
    if (data.previewFile) {
      data.loadingFile = false;
    }
  };
};

const onClickRemoveFile = (previewFile, postsFile) => {
  data[`${previewFile}`] = "";
  data.formUploadPosts[`${postsFile}`] = "";
};

const onClickOpenUploadPosts = () => {
  data.display = true;
};

const onClickUploadPosts = async (value) => {
  onActionActivePopupMessage(true, null, "Đang tải lên...");
  data.display = false;

  formData.set("user_id", user_info.user_id);
  formData.set("posts_content", value.postsContent);
  formData.set("posts_file", value.postsFile);
  formData.set("type_file", data.typeFile);

  const res = await onActionCreateNewPosts(formData);

  if (res) {
    setTimeout(() => {
      emits("onEmitUpdateListPosts");
      onActionActivePopupMessage(
        true,
        1,
        "Bài viết của bạn đã được tải lên bảng tin!"
      );
      data.formUploadPosts.postsContent = "";
      data.formUploadPosts.postsFile = "";
      data.previewFile = "";
      data.typeFile = "";
    }, 1000);
  }
};
</script>

<template>
  <div class="card w-full flex align-items-center gap-2">
    <UserItem :userAvatar="onGetterUserInfo?.avatar_user" />

    <div
      @click="onClickOpenUploadPosts()"
      style="padding: 0.7rem"
      class="w-full flex align-items-center bg-light-blue border-round-3xl gap-2 cursor-pointer on-click-2"
    >
      <input
        class="w-full border-none bg-transparent outline-none cursor-pointer"
        type="text"
        placeholder="Bạn đang nghĩ gì?"
        readonly
      />
    </div>

    <i style="color: #41b35d; font-size: 1.2rem" class="pi pi-image" />
  </div>

  <Dialog
    v-model:visible="data.display"
    modal
    header="Tạo bài viết"
    class="w-30rem"
  >
    <div class="flex flex-column gap-3">
      <UserItem
        :userAvatar="onGetterUserInfo?.avatar_user"
        :fullName="onGetterUserInfo?.full_name"
        :content="formatDate(new Date())"
        :icon="'pi pi-globe'"
      />

      <Editor
        v-model="data.formUploadPosts.postsContent"
        editorStyle="height: 5rem"
        aria-describedby="editor-error"
      >
        <template v-slot:toolbar>
          <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
          </span>
        </template>
      </Editor>

      <div
        class="relative h-14rem border-dashed border-1 text-main-color flex justify-content-center align-items-center"
      >
        <div v-if="data.previewFile" class="w-full h-full">
          <video
            v-if="data.typeFile === 'video'"
            class="w-full h-full bg-black"
            controls
          >
            <source :src="data.previewFile" type="video/mp4" />
          </video>

          <img
            v-else
            class="w-full h-full object-fit-cover"
            :src="data.previewFile"
            alt=""
          />

          <i
            @click="onClickRemoveFile('previewFile', 'postsFile')"
            class="pi pi-times text-main-color absolute right-0 top-0 p-2 border-round-lg on-click font-bold"
          />
        </div>

        <div v-else class="text-center">
          <div
            v-if="data.loadingFile"
            class="flex flex-column align-items-center gap-1"
          >
            <ProgressSpinner
              style="width: 40px; height: 40px"
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
            />

            <span>Đang tải...</span>
          </div>

          <div v-else class="flex flex-column gap-2">
            <i class="pi pi-image text-2xl" />
            <span>Thêm ảnh/video</span>
          </div>

          <input
            class="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
            type="file"
            @change="onUploadFile($event, 'previewFile', 'postsFile')"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        @click="onClickUploadPosts(data.formUploadPosts)"
        class="w-full mt-3"
        label="Đăng"
        :disabled="
          !data.formUploadPosts.postsContent && !data.formUploadPosts.postsFile
        "
      />
    </template>
  </Dialog>
</template>

<style scoped>
@media only screen and (max-width: 500px) {
}
</style>
