import { defineStore } from "pinia";
import { API_APP } from "./api";
import { computed, reactive, ref } from "vue";

export * as STORE_PERSONAL from "@/views/personal/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  // State
  const popUpMessage = ref({});

  const userInfo = reactive({});

  // Getter
  const onGetterPopupMessage = computed(() => popUpMessage);

  const onGetterUserInfo = computed(() => userInfo);

  // Action
  const onActionActivePopupMessage = (display, status, content) => {
    popUpMessage.value = {
      display,
      status,
      content,
    };
  };

  const onActionAccountRegister = async (args) => {
    return await API_APP.onApiAccountRegister(args)
      .then(({ data: res }) => {
        if (res.statusCode === 200) {
          return "OK";
        }
        if (res.statusCode === 210) {
          return "EXIST";
        } else {
          throw res.statusValue;
        }
      })
      .catch((error) => {
        console.log("Lỗi: " + error);
      });
  };

  const onActionAccountLogin = async (args) => {
    return await API_APP.onApiAccountLogin(args)
      .then(({ data: res }) => {
        if (res.statusCode === 200 || res.statusCode === 205) {
          return res;
        } else {
          throw res.statusValue;
        }
      })
      .catch((error) => {
        console.log("Lỗi: " + error);
      });
  };

  const onActionGetUserInfo = async (params) => {
    return await API_APP.onApiGetGetUserInfo(params)
      .then(({ data: res }) => {
        if (res.statusCode === 200) {
          Object.assign(userInfo, res.data);
          return res.data;
        } else {
          throw res.statusValue;
        }
      })
      .catch((error) => {
        console.log("Lỗi: " + error);
      });
  };

  const onActionLikePosts = async (args) => {
    return await API_APP.onApiLikePosts(args)
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

  const onActionCommentPosts = async (args) => {
    return await API_APP.onApiCommentPosts(args)
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

  const onActionCreateNewPosts = async (args) => {
    return await API_APP.onApiCreateNewPosts(args)
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
    onGetterPopupMessage,

    onGetterUserInfo,

    // Action
    onActionActivePopupMessage,
    onActionAccountRegister,
    onActionAccountLogin,
    onActionGetUserInfo,
    onActionLikePosts,
    onActionCommentPosts,
    onActionCreateNewPosts,
  };
});
