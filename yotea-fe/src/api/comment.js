import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "comments";

export const add = (comment, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const get = (productId, start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?productId=${productId}&_expand=userId&_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const remove = (id, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${id}/${user._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
