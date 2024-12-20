import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "catenews";

export const getAll = () => {
  const url = `/${DB_NAME}/?_sort=createdAt&_order=desc`;
  return instance.get(url);
};

export const get = (slug) => {
  const url = `/${DB_NAME}/${slug}`;
  return instance.get(url);
};

export const add = (category, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, category, {
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

export const update = (category, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${category._id}/${user._id}`;
  return instance.put(url, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
