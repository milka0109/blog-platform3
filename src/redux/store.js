import { configureStore } from "@reduxjs/toolkit";

import { blogApi } from "./blog-api";
import { listReducer } from "./listSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    list: listReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});
