import { configureStore } from "@reduxjs/toolkit";
import dataEntryReducer from "./features/ChartSelection";
import coordinateSlice from "./features/Coordinates";
import chartConfig from "./features/ChartConfig";

export const store = configureStore({
  reducer: { dataEntryReducer, coordinateSlice, chartConfig },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
