import http from "@/utils/http";

export const getAsyncRoutes = () => {
  return http({
    method: "GET",
    url: "/getAsyncRoutes",
  });
};
