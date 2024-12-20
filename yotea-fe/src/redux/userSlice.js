import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, getAll, remove, update } from "../api/user";

const initialState = {
  value: [],
  totalUser: 0,
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ start, limit }) => {
    const { data } = await getAll();
    const totalUser = data.length;

    const { data: dataUser } = await getAll(start, limit);

    return { totalUser, dataUser };
  }
);

export const addUser = createAsyncThunk("user/addUser", async (dataUser) => {
  const { data } = await add(dataUser);
  return data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (dataUser) => {
    const { data } = await update(dataUser);
    return data;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  return remove(id).then(() => id);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.value = payload.dataUser;
      state.totalUser = payload.totalUser;
    });

    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.value = [...state.value, payload];
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.value = state.value.map((item) =>
        item._id === payload._id ? payload : item
      );
    });

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.value = state.value.filter((item) => item._id !== payload);
    });
  },
});

export const selectUsers = (state) => state.user.value;
export const selectTotalUser = (state) => state.user.totalUser;
export default userSlice.reducer;
