import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "store";

export const getAll = (start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const search = (keyword) => {
  const url = `/${DB_NAME}/?name_like=${keyword}&_sort=createdAt&_order=desc`;
  return instance.get(url);
};

export const get = (id) => {
  const url = `/${DB_NAME}/${id}`;
  return instance.get(url);
};

export const add = (store, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, store, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const remove = (id, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${id}/${user._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const update = (store, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${store._id}/${user._id}`;
  return instance.put(url, store, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
