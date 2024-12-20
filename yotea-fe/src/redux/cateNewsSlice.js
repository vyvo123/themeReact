import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, getAll, remove, update } from "../api/categoryNews";

const initialState = {
  value: [],
};

export const getCateNews = createAsyncThunk(
  "cateNews/getCateNews",
  async () => {
    const { data } = await getAll();
    return data;
  }
);

export const addCateNews = createAsyncThunk(
  "cateNews/addCateNews",
  async (dataCate) => {
    const { data } = await add(dataCate);
    return data;
  }
);

export const updateCateNews = createAsyncThunk(
  "cateNews/updateCateNews",
  async (dataCate) => {
    const { data } = await update(dataCate);
    return data;
  }
);

export const deleteCateNews = createAsyncThunk(
  "cateNews/deleteCateNews",
  async (id) => {
    return remove(id).then(() => id);
  }
);

const cateNewsSlice = createSlice({
  name: "cateNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCateNews.fulfilled, (state, { payload }) => {
      state.value = payload;
    });

    builder.addCase(addCateNews.fulfilled, (state, { payload }) => {
      state.value = [...state.value, payload];
    });

    builder.addCase(updateCateNews.fulfilled, (state, { payload }) => {
      state.value = state.value.map((item) =>
        item._id === payload._id ? payload : item
      );
    });

    builder.addCase(deleteCateNews.fulfilled, (state, { payload }) => {
      state.value = state.value.filter((item) => item._id !== payload);
    });
  },
});

export const selectCateNews = (state) => state.cateNews.value;
export default cateNewsSlice.reducer;
