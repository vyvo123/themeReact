export const isAuthenticate = () => {
  return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth)
    .value;
};
