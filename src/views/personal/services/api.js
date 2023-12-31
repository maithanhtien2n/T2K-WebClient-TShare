import { AxiosInstance } from "@/services/api";

class ApiPersonal {
  onApiGetUserPersonalInfo = (params) => {
    return AxiosInstance({
      method: "get",
      url: `personal-info/${params}`,
    });
  };

  onApiGetPostsUser = (params) => {
    return AxiosInstance({
      method: "get",
      url: `posts/${params}`,
    });
  };

  onApiUpdateAvatar = (args) => {
    return AxiosInstance({
      method: "post",
      url: "user-info/avatar",
      data: args,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}

export const API_PERSONAL = new ApiPersonal();
