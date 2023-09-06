import { defineStore } from "pinia";
import { API_PERSONAL } from "@/services/api";
import { computed, reactive, ref } from "vue";

// export * as STORE_HOME from "@/views/home/services/store";

export const StorePersonal = defineStore("StorePersonal", () => {
  // State
  const userPersonalInfo = reactive({});
  const listPostsUser = reactive([]);

  // Getter
  const onGetterListPostsUser = computed(() => listPostsUser);
  const onGetterUserPersonalInfo = computed(() => userPersonalInfo);

  // Action
  const onActionGetUserPersonalInfo = async (params) => {
    return await API_PERSONAL.API_PERSONAL.onApiGetUserPersonalInfo(params)
      .then(({ data: res }) => {
        if (res.statusCode === 200) {
          Object.assign(userPersonalInfo, res.data);
          return res.data;
        } else {
          throw res.statusValue;
        }
      })
      .catch((error) => {
        console.log("Lỗi: " + error);
      });
  };

  const onActionGetPostsUser = async (params) => {
    return await API_PERSONAL.API_PERSONAL.onApiGetPostsUser(params)
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
    onGetterUserPersonalInfo,
    onGetterListPostsUser,

    // Action
    onActionGetUserPersonalInfo,
    onActionGetPostsUser,
    onActionUpdateAvatar,
  };
});
