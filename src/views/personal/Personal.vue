<script setup>
import Posts from "@/components/Posts.vue";
import UploadPosts from "@/components/UploadPosts.vue";
import InfoFriend from "./components/InfoFriend.vue";
import { STORE_PERSONAL } from "@/services/stores";
import { onMounted, watch } from "vue";
import Avatar from "./components/Avatar.vue";
import { appLocalStorage, formatDate } from "@/utils";
import { useRoute } from "vue-router";

const ROUTE = useRoute();

const {
  onGetterUserPersonalInfo,
  onActionGetPostsUser,
  onGetterListPostsUser,
  onActionGetUserPersonalInfo,
} = STORE_PERSONAL.StorePersonal();

const { user_info, account_id } = appLocalStorage();

const onEmitUpdateListPosts = () => {
  onActionGetPostsUser(user_info.user_id);
};

watch(
  () => ROUTE.params.username,
  (value) => {
    if (value) onActionGetUserPersonalInfo(value);
  }
);

onMounted(() => {
  onActionGetPostsUser(user_info.user_id);
  onActionGetUserPersonalInfo(ROUTE.params.username);
});
</script>

<template>
  <div class="ab container-personal pt-8 px-8">
    <div class="w-full z-5">
      <img
        class="banner w-full h-20rem object-fit-cover cursor-pointer box-shadow-1"
        :src="
          onGetterUserPersonalInfo?.banner_user
            ? onGetterUserPersonalInfo?.banner_user
            : 'https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-cartoon-banner-seascape-viewskybluecoconut-treeoceanblue-sky-image_56390.jpg'
        "
        alt=""
      />

      <Avatar
        :info="{
          account_id: account_id,
          user_id: user_info.user_id,
          avatar: onGetterUserPersonalInfo?.avatar_user,
        }"
        :updateAvatar="onGetterUserPersonalInfo.account_id === account_id"
      />
    </div>

    <div class="block-1 w-full h-6rem"></div>

    <div class="w-full flex flex-column align-items-center gap-3">
      <div class="flex flex-column gap-2 align-items-center">
        <span class="text-2xl font-bold mt-2">{{
          onGetterUserPersonalInfo?.full_name
        }}</span>
        <span>{{
          onGetterUserPersonalInfo?.marital_status
            ? onGetterUserPersonalInfo?.marital_status
            : "Chào mừng bạn đến với trang của tôi!"
        }}</span>
      </div>

      <InfoFriend />

      <!-- Body -->
      <div class="container-body bg-light-blue w-full flex gap-3 mt-5 md:mt-0">
        <div class="col-5 card flex flex-column gap-3 p-3">
          <span class="font-bold">Thông tin</span>

          <div class="container-info flex flex-column gap-2">
            <label
              class="flex align-content-center gap-2 justify-content-between"
            >
              <span>Ngày sinh:</span>
              <span>{{
                formatDate(onGetterUserPersonalInfo?.birth_date)
              }}</span>
            </label>

            <label
              class="flex align-content-center gap-2 justify-content-between"
            >
              <span>Giới tính:</span>
              <span>{{ onGetterUserPersonalInfo?.gender }}</span>
            </label>

            <label
              class="flex align-content-center gap-2 justify-content-between"
            >
              <span>Tình trạng:</span>
              <span>Chưa cập nhật</span>
            </label>

            <label
              class="flex align-content-center gap-2 justify-content-between"
            >
              <span>Số lượt theo dõi:</span>
              <span>100000</span>
            </label>
          </div>
        </div>

        <div
          style="min-width: 25rem"
          class="container-posts flex-1 flex flex-column gap-3 align-items-center"
        >
          <UploadPosts @onEmitUpdateListPosts="onEmitUpdateListPosts" />

          <Posts
            v-for="(item, index) in onGetterListPostsUser"
            :key="index"
            :postsContentInfo="item"
            @onEmitUpdateListPosts="onEmitUpdateListPosts"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 1041px) {
  .container-personal {
    padding-left: 0rem !important;
    padding-right: 0rem !important;
  }

  .container-info {
    width: 100% !important;
  }
}

@media only screen and (max-width: 800px) {
  .container-personal {
    padding-left: 0rem !important;
    padding-right: 0rem !important;
  }

  .container-body {
    flex-wrap: wrap;
    margin-top: 0rem !important;
    gap: 0.5rem !important;
  }

  .card {
    width: 100% !important;
  }

  .container-posts {
    min-width: 100% !important;
    gap: 0.5rem !important;
  }

  .banner {
    height: 10rem !important;
  }
}

@media only screen and (max-width: 800px) {
  .banner {
    height: 15rem !important;
  }
}

@media only screen and (max-width: 600px) {
  .container-personal {
    padding-top: 4.2rem !important;
  }

  .banner {
    height: 11rem !important;
  }

  .avatar-1 {
    width: 10rem !important;
    height: 10rem !important;
  }

  .block-1 {
    height: 4rem !important;
    margin-bottom: 1.7rem;
  }
}
</style>
