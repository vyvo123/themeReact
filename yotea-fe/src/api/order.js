import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "orders";

export const getAll = (start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const get = (id) => {
  const url = `/${DB_NAME}/${id}`;
  return instance.get(url);
};

export const getByUserId = (userId, start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?userId=${userId}&_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const add = (order) => {
  const url = `/${DB_NAME}`;
  return instance.post(url, order);
};

export const remove = (id) => {
  const url = `/${DB_NAME}/${id}`;
  return instance.delete(url);
};

export const update = (order, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${order._id}/${user._id}`;
  return instance.put(url, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
