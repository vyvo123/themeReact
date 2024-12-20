import instance from "./instance";

export const signin = (user) => {
  const url = `/signin`;
  return instance.post(url, user);
};

export const signup = (user) => {
  const url = `/signup`;
  return instance.post(url, user);
};

export const checkPassword = (data) => {
  const url = `/checkPassword`;
  return instance.post(url, data);
};
