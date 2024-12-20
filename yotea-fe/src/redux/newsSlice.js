import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, getAll, remove, update } from "../api/news";

const initialState = {
  value: [],
  totalItem: 0,
};

export const getNews = createAsyncThunk(
  "news/getNews",
  async ({ start, limit }) => {
    const { data } = await getAll();
    const totalItem = data.length;

    const { data: newsList } = await getAll(start, limit);
    return {
      totalItem,
      newsList,
    };
  }
);

export const addNews = createAsyncThunk("news/addNews", async (dataNews) => {
  const { data } = await add(dataNews);
  return data;
});

export const updateNews = createAsyncThunk(
  "news/updateNews",
  async (dataNews) => {
    const { data } = await update(dataNews);
    return data;
  }
);

export const deleteNews = createAsyncThunk("news/deleteNews", async (id) => {
  return remove(id).then(() => id);
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, { payload }) => {
      state.value = payload.newsList;
      state.totalItem = payload.totalItem;
    });

    builder.addCase(addNews.fulfilled, (state, { payload }) => {
      state.value = [...state.value, payload];
    });

    builder.addCase(updateNews.fulfilled, (state, { payload }) => {
      state.value = state.value.map((item) =>
        item._id === payload._id ? payload : item
      );
    });

    builder.addCase(deleteNews.fulfilled, (state, { payload }) => {
      state.value = state.value.filter((item) => item._id !== payload);
    });
  },
});

export const selectNews = (state) => state.news.value;
export const selectTotalNews = (state) => state.news.totalItem;

export default newsSlice.reducer;
