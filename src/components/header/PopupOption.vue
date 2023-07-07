<script setup>
import DATA_HEADER from "./data";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Notification from "./Notification.vue";

const ROUTER = useRouter();
const ROUTE = useRoute();

const data = reactive({
  styleCSS: {
    styleContainerOption: {
      transform: "translateX(-100%)",
      transition: "all .3s ease",
      isClicked: true,
    },
  },
});

const onClickOpenPopupOption = () => {
  data.styleCSS.styleContainerOption.transform = "translateX(0)";
};

const onClickRemovePopupOption = () => {
  data.styleCSS.styleContainerOption.transform = "translateX(-100%)";
};

const onClickItemOption = (code) => {
  switch (code) {
    case "Personal":
      ROUTER.push({ name: "Personal", params: { string: "tienthanh2000" } });
      data.styleCSS.styleContainerOption.transform = "translateX(-100%)";
      break;
    case "Setting":
      ROUTER.push({ name: "Setting" });
      data.styleCSS.styleContainerOption.transform = "translateX(-100%)";
      break;
    case "Logout":
      ROUTER.push({ name: "Login" });
      data.styleCSS.styleContainerOption.transform = "translateX(-100%)";
      break;
  }
};
</script>

<template>
  <div class="flex align-items-center gap-2">
    <div class="relative">
      <i
        class="pi pi-comment avatar bg-light-blue flex justify-content-center align-items-center cursor-pointer on-click-2"
      />
      <span class="count">3</span>
    </div>

    <Notification />

    <img
      @click="onClickOpenPopupOption"
      class="avatar object-fit-cover cursor-pointer on-click-2"
      src="https://toigingiuvedep.vn/wp-content/uploads/2022/11/avatar-ngau-cool-nam.jpg"
      alt=""
    />
  </div>

  <!-- Account setting -->
  <div
    :style="data.styleCSS.styleContainerOption"
    class="container-setting fixed z-5 w-20rem bg-main-color bow-shadow-1 p-3 top-0 left-0 bottom-0"
  >
    <div class="flex justify-content-between">
      <span class="font-bold">Tùy chọn</span>
      <i
        @click="onClickRemovePopupOption"
        class="pi pi-times cursor-pointer on-click"
      />
    </div>

    <div class="flex flex-column gap-3 mt-4">
      <span
        v-for="(item, index) in DATA_HEADER.options"
        :key="index"
        :class="{
          'text-main-color font-bold': item.code === ROUTE.name,
          [item.color]: true,
        }"
        class="unselectable flex align-items-center bg-light-blue gap-2 p-3 on-click-2 cursor-pointer"
        @click="onClickItemOption(item.code)"
        ><i
          :class="{ 'font-bold': item.code === ROUTE.name, [item.icon]: true }"
        />{{ item.name }}</span
      >
    </div>
  </div>
  <div
    v-if="data.styleCSS.styleContainerOption.transform === 'translateX(0)'"
    class="bg-black fixed top-0 left-0 right-0 bottom-0 bg-black-alpha-50"
    @click="onClickRemovePopupOption"
  ></div>
</template>

<style scoped>
@media only screen and (max-width: 500px) {
  .container-setting {
    width: 17rem !important;
  }
}
</style>
