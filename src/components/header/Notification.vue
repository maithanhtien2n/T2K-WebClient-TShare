<script setup>
import { reactive } from "vue";
import DATA from "./data";

const data = reactive({
  display: false,
  displayBg: false,
});

const onClickIconNotification = () => {
  data.display = true;
  data.displayBg = true;
};

const onClickRemovePopup = () => {
  data.display = false;
  data.displayBg = false;
};
</script>

<template>
  <div class="relative">
    <i
      @click="onClickIconNotification"
      :class="{ 'bg-main-color': data.display, 'bg-light-blue': !data.display }"
      class="pi pi-bell avatar flex justify-content-center align-items-center cursor-pointer on-click-2"
    />
    <span class="count">12</span>

    <div
      v-if="data.display"
      style="top: 110%; right: -2.8rem"
      class="container-notification z-5 p-3 bg-light-blue box-shadow-2 border-round-2xl absolute w-25rem flex flex-column gap-3"
    >
      <span class="font-bold">Thông báo</span>
      <ScrollPanel style="width: 100%; height: 25rem" class="custombar2">
        <div class="flex flex-column gap-2">
          <UserItem
            v-for="(item, index) in DATA.notifications"
            :key="index"
            :userAvatar="item.userAvatar"
            :fullName="item.userName"
            :content="item.content"
            style="border-bottom: 1px solid #ddd"
            class="bg-light-blue p-2 mr-4"
          />
        </div>
      </ScrollPanel>
    </div>
  </div>

  <div
    v-if="data.displayBg"
    class="fixed top-0 left-0 right-0 bottom-0"
    @click="onClickRemovePopup"
  ></div>
</template>

<style scoped>
@media only screen and (max-width: 530px) {
  .container-notification {
    width: 21rem !important;
  }
}
</style>
