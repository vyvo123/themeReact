import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "users";

export const getAll = (start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const get = (id) => {
  const url = `/${DB_NAME}/${id}`;
  return instance.get(url);
};

export const add = (userData, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, userData, {
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

export const update = (userData, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${userData._id}/${user._id}`;
  return instance.put(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMyInfo = (userData, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/updateInfo/${userData._id}/${user._id}`;
  return instance.put(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `${DB_NAME}`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
