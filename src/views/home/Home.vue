<script setup>
import ColLeft from "./components/ColLeft.vue";
import UploadPosts from "@/components/UploadPosts.vue";
import Posts from "@/components/Posts.vue";
import ColRight from "./components/ColRight.vue";
import { appLocalStorage } from "@/utils";
import { STORE_PERSONAL } from "@/services/stores";
import { onMounted } from "vue";

const { onActionGetPostsUser, onGetterListPostsUser } =
  STORE_PERSONAL.StorePersonal();
const { user_info } = appLocalStorage();

const onEmitUpdateListPosts = () => {
  onActionGetPostsUser(user_info.user_id);
};

onMounted(() => {
  onActionGetPostsUser(user_info.user_id);
});
</script>

<template>
  <div class="container-home flex gap-3 pt-8">
    <!-- Container left -->
    <div class="container-left flex-1">
      <ColLeft />
    </div>

    <!-- Container body -->
    <div class="container-center col-5 p-0 flex flex-column gap-3">
      <UploadPosts />

      <Posts
        v-for="(item, index) in onGetterListPostsUser"
        :key="index"
        :postsContentInfo="item"
        @onEmitUpdateListPosts="onEmitUpdateListPosts"
      />
    </div>

    <!-- Container right -->
    <div class="container-right flex-1">
      <ColRight />
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 800px) {
  .container-home {
    padding-top: 8.5rem !important;
  }
  .card {
    border-radius: 0rem !important;
  }

  .body-card-img {
    height: 17rem !important;
  }

  .container-center {
    width: 100% !important;
    gap: 0.5rem !important;
  }

  .container-left {
    display: none;
  }

  .container-right {
    display: none;
  }
}
</style>
