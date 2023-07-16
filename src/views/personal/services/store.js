import { defineStore } from "pinia";
import { API_PERSONAL } from "@/services/api";
import { computed, reactive, ref } from "vue";

// export * as STORE_HOME from "@/views/home/services/store";

export const StorePersonal = defineStore("StorePersonal", () => {
  // State
  const listPostsUser = reactive([]);

  // Getter
  const onGetterListPostsUser = computed(() => listPostsUser);

  // Action

  const onActionGetPostsUser = async (params) => {
    return await API_PERSONAL.API_PERSONAL.onApiGetGetUserInfo(params)
      .then(({ data: res }) => {
        if (res.statusCode === 200) {
          Object.assign(listPostsUser, res.data);
          return res.data;
        } else {
          throw res.statusValue;
        }
      })
      .catch((error) => {
        console.log("Lỗi: " + error);
      });
  };

  const onActionUpdateAvatar = async (args) => {
    return await API_PERSONAL.API_PERSONAL.onApiUpdateAvatar(args)
      .then(({ data: res }) => {
        if (res.statusCode === 200) {
          return true;
        } else {
          throw res.statusValue;
        }
      })
      .catch((error) => {
        console.log("Lỗi: " + error);
      });
  };

  return {
    // Getter
    onGetterListPostsUser,

    // Action
    onActionGetPostsUser,
    onActionUpdateAvatar,
  };
});
