export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};
export const getAccessToken = () => localStorage.getItem("accessToken");
export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
};
