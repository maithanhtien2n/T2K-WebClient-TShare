<script setup>
import { computed, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import PopupOption from "./header/PopupOption.vue";
import { StoreApp } from "@/services/stores";

const { onActionLoadingActive, onActionSearch, onGetterPostsSearch } =
  StoreApp();

const ROUTER = useRouter();
const ROUTE = useRoute();

const data = reactive({
  keySearch: "",
  displaySearch: true,
  popupSearchSuggestions: false,
  screenWidth: window.innerWidth,
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 54 && +data.screenWidth < 800) {
    data.displaySearch = false;
    data.keySearch = "";
  } else {
    data.displaySearch = true;
  }
});

window.addEventListener("resize", () => {
  data.screenWidth = window.innerWidth;
});

const onClickOpenSearchSuggestions = () => {
  if (data.keySearch) data.popupSearchSuggestions = true;
};

watch(
  () => data.keySearch,
  (value) => {
    if (value) data.popupSearchSuggestions = true;
    else data.popupSearchSuggestions = false;
  }
);

const onClickSearch = () => {
  onActionLoadingActive(true);
  data.popupSearchSuggestions = false;

  setTimeout(() => {
    onActionLoadingActive(false);

    ROUTER.push({ name: "Search", query: { key: data.keySearch } });
  }, 1000);
};

const onKeyEnterSearch = () => {
  if (data.keySearch) onClickSearch();
};

const onInputSearch = () => {
  onActionSearch(data.keySearch);
};

const onClickUserItemInfo = (userName) => {
  onActionLoadingActive(true);
  data.popupSearchSuggestions = false;
  data.keySearch = "";

  setTimeout(() => {
    onActionLoadingActive(false);
    ROUTER.push({ name: "Personal", params: { string: userName } });
  }, 1000);
};
</script>

<template>
  <div
    v-if="data.popupSearchSuggestions"
    class="bg-remove fixed top-0 left-0 right-0 bottom-0 bg-black-alpha-40 z-1 bg-black-alpha-50"
    @click="data.popupSearchSuggestions = false"
  ></div>

  <div
    style="border-bottom: 1px solid #ddd; z-index: 999"
    class="container-header fixed bg-white top-0 left-0 right-0 py-2 px-8"
  >
    <div class="relative flex align-items-center justify-content-between">
      <div
        @click="ROUTER.push({ name: 'Home' })"
        class="unselectable font-bold text-2xl text-main-color cursor-pointer on-click"
      >
        t share
      </div>

      <div
        v-if="ROUTE.name === 'Home' || +data.screenWidth > 800"
        class="container-search relative"
      >
        <div
          v-if="data.displaySearch"
          class="content-search box-shadow-1 w-25rem flex align-items-center bg-light-blue p-3 border-round-3xl gap-2"
        >
          <input
            v-model="data.keySearch"
            class="w-full border-none bg-transparent outline-none"
            type="text"
            placeholder="Bạn cần tìm gì?"
            @keydown.enter="onKeyEnterSearch"
            @click="onClickOpenSearchSuggestions"
            @input="onInputSearch"
          />
          <i
            @click="onClickSearch"
            class="pi pi-search on-click-3 cursor-pointer"
            :class="{ 'p-disabled': !data.keySearch }"
          />
        </div>

        <div
          v-if="data.displaySearch && data.popupSearchSuggestions"
          class="absolute left-0 right-0 box-shadow-2 py-2 bg-white border-round-lg mt-2 flex flex-column"
        >
          <!-- Người dùng -->
          <div
            v-for="(item, index) in onGetterPostsSearch?.users?.slice(0, 2)"
            :key="index"
            class="search-item px-3 py-2 border-round-lg flex align-items-center border-bottom-1 text-100 cursor-pointer on-click unselectable"
            @click="onClickUserItemInfo(item.account_info.user_name)"
          >
            <UserItem
              :userAvatar="item.avatar_user"
              :fullName="item.full_name"
              :content="item.gender"
            />
          </div>

          <!-- Bài viết -->
          <div
            v-for="(item, index) in onGetterPostsSearch?.posts?.slice(0, 2)"
            :key="index"
            class="search-item px-3 py-2 border-round-lg gap-2 flex align-items-center border-bottom-1 text-100 cursor-pointer on-click unselectable"
          >
            <i
              class="avatar box-shadow-1 flex justify-content-center align-items-center pi pi-pencil text-900"
            />

            <span class="text-900" v-html="item.posts_content"></span>
          </div>

          <!-- Footer search -->
          <div
            class="px-3 h-3rem border-round-lg gap-2 flex align-items-center cursor-pointer on-click unselectable"
          >
            <i
              class="text-main-color flex justify-content-center align-items-center pi pi-search"
            />

            <span class="text-main-color"
              >Tìm với từ khóa "{{ data.keySearch }}"</span
            >
          </div>
        </div>
      </div>

      <!-- Account setting -->
      <PopupOption />
    </div>
  </div>
</template>

<style scoped>
.search-item {
  transition: all 0.2s ease;
}

.search-item:hover {
  background: #ddd;
  border-radius: 0px !important;
}

@media only screen and (max-width: 800px) {
  .container-header {
    padding: 0.9rem 1rem !important;
  }

  .container-search {
    position: absolute !important;
    left: 0rem !important;
    right: 0rem !important;
    top: 170%;
  }

  .content-search {
    width: 100% !important;
    background-color: #fff;
  }
}
</style>
