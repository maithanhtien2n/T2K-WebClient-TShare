<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import PopupOption from "./header/PopupOption.vue";

const ROUTER = useRouter();
const ROUTE = useRoute();

const data = reactive({
  keySearch: "",
  displaySearch: true,
  screenWidth: window.innerWidth,
});

window.addEventListener("scroll", () => {
  window.scrollY > 54 && +data.screenWidth < 800
    ? (data.displaySearch = false)
    : (data.displaySearch = true);
});

window.addEventListener("resize", () => {
  data.screenWidth = window.innerWidth;
});

const onClickSearch = () => {
  ROUTER.push({ name: "Search", query: { key: data.keySearch } });
};

const listSearch = {
  users: [
    {
      fullName: "Tiện Thanh",
      content: "Bạn bè",
    },
    {
      fullName: "Tiện Thanh",
      content: "Bạn bè",
    },
    {
      fullName: "Tiện Thanh",
      content: "Bạn bè",
    },
  ],
  posts: [
    {
      title: "Hôm nay trời đẹp quá",
    },
    {
      title: "Bài hát hót nhất hôm nay",
    },
    {
      title: "Bài hát hót nhất hôm nay",
    },
  ],
};
</script>

<template>
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
        class="container-search"
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
            @keydown.enter="onClickSearch"
          />
          <i
            @click="onClickSearch"
            class="pi pi-search on-click-3 cursor-pointer"
          />
        </div>

        <div
          v-if="data.displaySearch && data.keySearch"
          class="box-shadow-2 py-2 bg-white border-round-lg mt-2 flex flex-column"
        >
          <!-- Người dùng -->
          <div
            v-for="(item, index) in listSearch.users"
            :key="index"
            class="search-item px-3 py-2 border-round-lg flex align-items-center border-bottom-1 text-100 cursor-pointer on-click unselectable"
          >
            <UserItem :fullName="item.fullName" :content="item.content" />
          </div>

          <!-- Bài viết -->
          <div
            v-for="(item, index) in listSearch.posts"
            :key="index"
            class="search-item px-3 py-2 border-round-lg gap-2 flex align-items-center border-bottom-1 text-100 cursor-pointer on-click unselectable"
          >
            <i
              class="avatar box-shadow-1 flex justify-content-center align-items-center pi pi-pencil text-900"
            />

            <span class="text-900">{{ item.title }}</span>
          </div>

          <!-- Footer search -->
          <div
            class="px-3 h-3rem border-round-lg gap-2 flex align-items-center cursor-pointer on-click unselectable"
          >
            <i
              class="text-main-color flex justify-content-center align-items-center pi pi-search"
            />

            <span class="text-main-color"
              >Bạn muốn tìm "{{ data.keySearch }}"</span
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
    position: absolute;
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
