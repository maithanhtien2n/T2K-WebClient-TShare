import axios from "axios";

export * as API_PERSONAL from "@/views/personal/services/api";

class ApiApp {
  onApiAccountRegister = async (args) => {
    return await AxiosInstance({
      method: "post",
      url: "account/register",
      data: {
        full_name: `${args?.firstName + " " + args?.lastName}` || null,
        user_name: args?.userName || null,
        password: args?.password,
        birth_date: args?.dateOfBirth || null,
        gender: args?.gender || null,
      },
    });
  };

  onApiAccountLogin = async (args) => {
    return await AxiosInstance({
      method: "post",
      url: "account/login",
      data: {
        user_name: args?.userName,
        password: args?.password,
      },
    });
  };

  onApiGetGetUserInfo = async (params) => {
    return await AxiosInstance({
      method: "get",
      url: `user-info/${params}`,
    });
  };

  onApiLikePosts = async (args) => {
    return await AxiosInstance({
      method: "post",
      url: "posts/like",
      data: {
        posts_id: args?.posts_id,
        user_id: args?.user_id,
      },
    });
  };

  onApiCommentPosts = async (args) => {
    return await AxiosInstance({
      method: "post",
      url: "posts/comment",
      data: {
        posts_id: args?.posts_id,
        user_id: args?.user_id,
        comment_content: args?.comment_content,
      },
    });
  };

  onApiCreateNewPosts = async (args) => {
    return await AxiosInstance({
      method: "post",
      url: "posts",
      data: args,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  onApiSearch = async (args) => {
    return await AxiosInstance({
      method: "post",
      url: "search",
      data: {
        key_search: args,
      },
    });
  };
}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  baseURL: "https://tshare.onrender.com/api/v1/",

  // baseURL: "http://localhost:3000/api/v1/",

  // baseURL: "http://192.168.1.4:9000/api/v1/",

  // baseURL: "https://missa.serveo.net/api/v1/",
});

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

updateAuthorizationHeader(
  JSON.parse(localStorage.getItem("AppLocalStorage"))?.accessToken
);

export { AxiosInstance, updateAuthorizationHeader };
