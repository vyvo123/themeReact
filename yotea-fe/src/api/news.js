import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "news";

export const getAll = (start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const getNewsById = (start = 0, limit = 0, category) => {
  let url = `/${DB_NAME}/?_sort=createdAt&_order=desc&category=${category}`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const get = (slug) => {
  const url = `/${DB_NAME}/${slug}/?_expand=category`;
  return instance.get(url);
};

export const add = (news, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, news, {
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

export const update = (news, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${news._id}/${user._id}`;
  return instance.put(url, news, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const relatedPost = (id, cateId, start = 0, limit = 0) => {
  let url = `/${DB_NAME}/?category=${cateId}&_id_ne=${id}&_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => `${DB_NAME}`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
