<script setup>
import { reactive } from "vue";

const formData = new FormData();
const data = reactive({
  formUploadPosts: {
    postsContent: "",
    postsFile: "",
  },
  previewFile: "",
  typeFile: "",
  display: false,
  loadingFile: false,
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
  formData.set("postsContent", value.postsContent);
  formData.set("postsFile", value.postsFile);

  data.display = false;
};
</script>

<template>
  <div class="card flex align-items-center gap-2">
    <img
      class="avatar object-fit-cover"
      src="https://toigingiuvedep.vn/wp-content/uploads/2022/11/avatar-ngau-cool-nam.jpg"
      alt=""
    />

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
      <div class="flex gap-2">
        <img
          class="avatar object-fit-cover on-click"
          src="https://thuthuatnhanh.com/wp-content/uploads/2021/02/Avatar-ngau-dep.jpg"
          alt=""
        />

        <label class="flex flex-column gap-1">
          <span class="font-bold">Húc Phượng</span>
          <div class="flex align-items-center gap-1">
            <span style="font-size: 0.8rem" class="text-600">1 giờ</span>
          </div>
        </label>
      </div>

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
