import instance from "./instance";

const DB_NAME = "orderDetail";

export const getAll = () => {
  const url = `/${DB_NAME}/?_sort=createdAt&_order=desc`;
  return instance.get(url);
};

export const get = (orderId) => {
  const url = `/${DB_NAME}/?orderId=${orderId}&_expand=productId`;
  return instance.get(url);
};

export const add = (orderDetail) => {
  const url = `/${DB_NAME}`;
  return instance.post(url, orderDetail);
};

export const remove = (id) => {
  const url = `/${DB_NAME}/${id}`;
  return instance.delete(url);
};

export const update = (orderDetail) => {
  const url = `/${DB_NAME}/${orderDetail._id}`;
  return instance.put(url, orderDetail);
};
