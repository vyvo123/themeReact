import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "favoritesProduct";

export const add = (data, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAll = (userId) => {
  const url = `/${DB_NAME}/?userId=${userId}&_expand=userId&_expand=productId&_sort=createdAt&_order=desc`;
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

export const checkUserHeart = (userId, productId) => {
  const url = `/${DB_NAME}/?userId=${userId}&productId=${productId}`;
  return instance.get(url);
};
