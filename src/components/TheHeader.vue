<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import PopupOption from "./header/PopupOption.vue";

const ROUTER = useRouter();
const ROUTE = useRoute();

const data = reactive({
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
</script>

<template>
  <div
    style="border-bottom: 1px solid #ddd"
    class="container-header fixed z-5 bg-white top-0 left-0 right-0 py-2 px-8"
  >
    <div class="relative flex align-items-center justify-content-between">
      <div
        @click="ROUTER.push({ name: 'Home' })"
        class="unselectable font-bold text-2xl text-main-color cursor-pointer on-click"
      >
        t share
      </div>

      <div
        v-if="ROUTE.name !== 'Personal' || +data.screenWidth > 800"
        class="container-search"
      >
        <div
          v-if="data.displaySearch"
          class="content-search box-shadow-1 w-25rem flex align-items-center bg-light-blue p-3 border-round-3xl gap-2"
        >
          <input
            class="w-full border-none bg-transparent outline-none"
            type="text"
            placeholder="Bạn cần tìm gì?"
          />
          <i class="pi pi-search on-click-3 cursor-pointer" />
        </div>
      </div>

      <!-- Account setting -->
      <PopupOption />
    </div>
  </div>
</template>

<style scoped>
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
