<script setup>
import CardPosts from "@/components/CardPosts.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { StoreApp } from "@/services/stores";

const { onActionSearch, onGetterPostsSearch } = StoreApp();

const ROUTE = useRoute();

const ROUTER = useRouter();

onMounted(() => {
  onActionSearch(ROUTE.query.key);
});
</script>

<template>
  <div style="min-height: 100vh" class="flex gap-3 mt-7">
    <div class="filter-container p-0 col-4 card mt-3"></div>

    <div class="gap-800px flex flex-column align-items-center gap-3 flex-1">
      <div
        v-if="
          onGetterPostsSearch?.users?.length > 0 ||
          onGetterPostsSearch?.posts?.length > 0
        "
        class="w-full pt-3"
      >
        <label class="result-search"
          >Kết quả tìm kiếm
          <span class="text-main-color">"{{ ROUTE.query.key }}"</span>
        </label>
      </div>

      <div
        v-else
        style="min-height: 100vh"
        class="w-full flex justify-content-center align-items-center"
      >
        <span>Không tìm thấy kết quả nào.</span>
      </div>

      <div
        v-if="onGetterPostsSearch?.users?.length > 0"
        class="card w-full flex flex-column gap-3"
      >
        <span>Người dùng</span>

        <div
          v-for="(item, index) in onGetterPostsSearch?.users"
          :key="index"
          class="card"
        >
          <UserItem :fullName="item.full_name" class="w-full">
            <div class="flex flex-column gap-1 mt-1">
              <span class="text-600">Giới tính: {{ item.gender }}</span>
              <span class="text-600">Số lượt theo dõi: 2000</span>
            </div>
          </UserItem>
        </div>
      </div>

      <div
        v-if="onGetterPostsSearch?.posts?.length > 0"
        class="card w-full gap-3 flex flex-column"
      >
        <span>Bài viết</span>

        <div class="flex flex-column gap-3 gap-800px">
          <CardPosts
            v-for="(item, index) in onGetterPostsSearch?.posts"
            :key="index"
            :postsContentInfo="item"
          />
        </div>
      </div>

      <div class="px-3 text-center text-700 line-height-2">
        Kết quả tìm kiếm chỉ bao gồm những nội dung hiển thị với bạn.
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 800px) {
  .filter-container {
    display: none;
  }
  .gap-800px {
    gap: 0.5rem !important;
  }

  .result-search {
    padding-left: 1rem;
  }
}
</style>
