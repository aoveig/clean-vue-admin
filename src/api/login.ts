import http from "@/utils/http";

export const getLogin = (data: object) => {
  return http({
    method: "POST",
    url: "/login",
    data,
  });
};
