import { configureStore } from "@reduxjs/toolkit";
import dataEntryReducer from "./features/ChartSelection";
import coordinateSlice from "./features/Coordinates";

export const store = configureStore({
  reducer: { dataEntryReducer, coordinateSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
