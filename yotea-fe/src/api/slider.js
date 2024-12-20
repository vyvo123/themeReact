import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";

const DB_NAME = "slider";

export const getAll = () => {
  const url = `/${DB_NAME}/?_sort=createdAt&_order=desc`;
  return instance.get(url);
};

export const get = (id) => {
  const url = `/${DB_NAME}/${id}`;
  return instance.get(url);
};

export const add = (slider, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${user._id}`;
  return instance.post(url, slider, {
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

export const update = (slider, { token, user } = isAuthenticate()) => {
  const url = `/${DB_NAME}/${slider._id}/${user._id}`;
  return instance.put(url, slider, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sliderApi = createApi({
  reducerPath: "sliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["Slider"],
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => `${DB_NAME}/?_sort=createdAt&_order=desc`,
      providesTags: ["Slider"],
    }),
  }),
});

export const { useGetSlidersQuery } = sliderApi;
