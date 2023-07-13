<script setup>
import Posts from "@/components/Posts.vue";
import { appLocalStorage } from "@/utils";
import { STORE_PERSONAL } from "@/services/stores";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const { onActionGetPostsUser, onGetterListPostsUser } =
  STORE_PERSONAL.StorePersonal();
const { user_info } = appLocalStorage();

const ROUTE = useRoute();

const ROUTER = useRouter();

onMounted(() => {
  onActionGetPostsUser(user_info.user_id);
});
</script>

<template>
  <div class="mt-7 p-3 flex flex-column gap-3">
    <label
      >Kết quả tìm kiếm
      <span class="text-main-color">"{{ ROUTE.query.key }}"</span>
    </label>

    <div class="card border-round-lg flex flex-column gap-3">
      <span>Người dùng</span>
      <UserItem :fullName="'Tiện Thanh'" :content="'Bạn bè'" />
      <UserItem :fullName="'Tiện Thanh'" :content="'Bạn bè'" />
      <UserItem :fullName="'Tiện Thanh'" :content="'Bạn bè'" />
    </div>

    <div class="card border-round-lg flex flex-column gap-3">
      <span>Bài viết</span>

      <Posts
        v-for="(item, index) in onGetterListPostsUser"
        :key="index"
        :postsContentInfo="item"
      />
    </div>
  </div>
</template>
