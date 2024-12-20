import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "contact";

export const getAll = (start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?_sort=createdAt&_order=desc&_expand=store`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const get = (id) => {
  const url = `/${DB_NAME}/${id}/?_expand=store`;
  return instance.get(url);
};

export const add = (contact) => {
  const url = `/${DB_NAME}`;
  return instance.post(url, contact);
};

export const remove = (id, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${id}/${user._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const update = (contact, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${contact._id}/${user._id}`;
  return instance.put(url, contact, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
