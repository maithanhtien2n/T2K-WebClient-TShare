import { AxiosInstance } from "@/services/api";

class ApiPersonal {
  onApiGetGetUserInfo = (params) => {
    return AxiosInstance({
      method: "get",
      url: `posts/${params}`,
    });
  };
}

export const API_PERSONAL = new ApiPersonal();
