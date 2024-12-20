import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DB_NAME = "products";

export const getAll = (
  start = 0,
  limit = 0,
  sort = "createdAt",
  order = "desc"
) => {
  let url = `/${DB_NAME}/?_expand=categoryId&_sort=${sort}&_order=${order}`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const getProductByCate = (
  start = 0,
  limit = 0,
  sort = "createdAt",
  order = "desc",
  cateId
) => {
  let url = `/${DB_NAME}/?categoryId=${cateId}&_sort=${sort}&_order=${order}&_expand=categoryId`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const getProductsRelated = (start = 0, limit = 0, id, cateId) => {
  let url = `/${DB_NAME}/?categoryId=${cateId}&_id_ne=${id}&status=1&_expand=categoryId&_sort=createdAt&_order=desc`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const search = (
  start = 0,
  limit = 0,
  sort = "createdAt",
  order = "desc",
  keyword
) => {
  let url = `/${DB_NAME}/?_sort=${sort}&_order=${order}&q=${keyword}`;
  if (limit) url += `&_start=${start}&_limit=${limit}`;
  return instance.get(url);
};

export const get = (slug) => {
  const url = `/${DB_NAME}/${slug}/?_expand=categoryId`;
  return instance.get(url);
};

export const getById = (id) => {
  const url = `/${DB_NAME}/${id}/?_expand=categoryId`;
  return instance.get(url);
};

export const add = (product, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, product, {
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

export const update = (product, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${product._id}/${user._id}`;
  return instance.put(url, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const clientUpdate = (product) => {
  const url = `/${DB_NAME}/userUpdate/${product._id}`;
  return instance.patch(url, product);
};

export const getFavorites = () => {
  const url = `/${DB_NAME}/?_sort=favorites&_order=desc&_limit=10`;
  return instance.get(url);
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ start = 0, limit = 0, sort = "createdAt", order = "desc" }) => {
        let url = `/${DB_NAME}/?_expand=categoryId&_sort=${sort}&_order=${order}`;
        if (limit) url += `&_start=${start}&_limit=${limit}`;
        return url;
      },
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation({
      query: (data, { token, user } = isAuthenticate()) => ({
        url: `${DB_NAME}/${user._id}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id, { token, user } = isAuthenticate()) => ({
        url: `${DB_NAME}/${id}/${user._id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data, { token, user } = isAuthenticate()) => ({
        url: `${DB_NAME}/${data._id}/${user._id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
