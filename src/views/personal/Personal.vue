<script setup>
import Posts from "@/components/Posts.vue";

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
  <div class="container-personal pt-8 px-8">
    <div class="relative w-full z-0">
      <img
        class="banner w-full h-20rem object-fit-cover"
        src="https://www.gry-online.pl/i/h/25/424526132.jpg"
        alt=""
      />

      <img
        style="
          transform: translate(-50%, 50%);
          left: 50%;
          bottom: 0;
          border: 3px solid #fff;
        "
        class="avatar-1 w-11rem h-11rem border-circle absolute"
        src="https://toigingiuvedep.vn/wp-content/uploads/2022/11/avatar-ngau-cool-nam.jpg"
        alt=""
      />
    </div>

    <div class="block-1 w-full h-6rem"></div>

    <div class="w-full flex flex-column align-items-center gap-3">
      <div class="flex flex-column gap-2 align-items-center">
        <span class="text-2xl font-bold">Tiện Thanh</span>
        <span>Trời hôm nay đẹp quá</span>
      </div>

      <div class="flex gap-2">
        <Button v-if="false" label="Thêm bạn bè" />

        <Button v-else label="Bạn bè" />

        <Button label="Nhắn tin" class="p-button-outlined" :disabled="false" />
      </div>

      <!-- Body -->
      <div class="container-body bg-light-blue w-full flex gap-3 mt-5 md:mt-0">
        <div class="col-5 card flex flex-column gap-3 p-3">
          <span class="font-bold">Thông tin</span>

          <div class="container-info col-9 p-0 flex flex-column gap-2">
            <label
              class="flex align-content-center gap-2 justify-content-between"
            >
              <span>Ngày sinh:</span>
              <span>08/11/2001</span>
            </label>

            <label
              class="flex align-content-center gap-2 justify-content-between"
            >
              <span>Giới tính:</span>
              <span>Nam</span>
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
          <Posts
            v-for="(item, index) in onGetterPostsInfo"
            :key="index"
            :postsContentInfo="item"
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
  }

  .card {
    width: 100% !important;
  }

  .container-posts {
    min-width: 100% !important;
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
  .banner {
    height: 12rem !important;
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
