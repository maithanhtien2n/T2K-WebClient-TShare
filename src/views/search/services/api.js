import { AxiosInstance } from "@/services/api";

class ApiSearch {
  onApiGetGetUserInfo = (params) => {
    return AxiosInstance({
      method: "get",
      url: `posts/${params}`,
    });
  };
}

export const API_SEARCH = new ApiSearch();
