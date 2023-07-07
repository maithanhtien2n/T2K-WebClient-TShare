<script setup>
import ColLeft from "./components/ColLeft.vue";
import UploadPosts from "./components/UploadPosts.vue";
import Posts from "@/components/Posts.vue";
import ColRight from "./components/ColRight.vue";

const onGetterPostsInfo = [
  {
    userAvatar: "https://nguoinoitieng.tv/images/nnt/105/0/biu1.jpg",
    userName: "Húc Phượng",
    postsDate: "1 giờ",
    postsContent: "Hôm nay trời đẹp quá",
    postsFile:
      "https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg",
    likeAmount: "1100",
    commentAmount: "121",
    shareAmount: "75",
  },
  {
    userAvatar: "https://nguoinoitieng.tv/images/nnt/105/0/biu1.jpg",
    userName: "Húc Phượng",
    postsDate: "1 giờ",
    postsContent: "Hôm nay trời đẹp quá",
    postsFile:
      "https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg",
    likeAmount: "1100",
    commentAmount: "121",
    shareAmount: "75",
  },
];
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
        v-for="(item, index) in onGetterPostsInfo"
        :key="index"
        :postsContentInfo="item"
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
