import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { productApi } from "../api/product";
import { sliderApi } from "../api/slider";
import { cateProductApi } from "../api/category";
import { userApi } from "../api/user";
import { newsApi } from "../api/news";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  thunk,
  productApi.middleware,
  sliderApi.middleware,
  cateProductApi.middleware,
  userApi.middleware,
  newsApi.middleware,
];

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);
export default persistStore(store);

setupListeners(store.dispatch);
