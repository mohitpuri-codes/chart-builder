import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app";

// Define a type for the slice state
interface Coordinates {
  XCoordinate: string[];
  YCoordinate: number[];
}

// Define the initial state using that type
const initialState: Coordinates = {
  XCoordinate: [],
  YCoordinate: [],
};

export const coordinateSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    addXCoordinates: (state, action: PayloadAction<string>) => {
      state.XCoordinate.push(action.payload);
    },
    addYCoordinates: (state, action: PayloadAction<number>) => {
      state.YCoordinate.push(action.payload);
    },
    deleteCoordinates: (state, action: PayloadAction<number>) => {
      state.XCoordinate = state.XCoordinate.filter(
        (_, index) => index === action.payload
      );
      state.YCoordinate = state.YCoordinate.filter(
        (_, index) => index === action.payload
      );
    },
  },
});

export const { addXCoordinates, addYCoordinates, deleteCoordinates } =
  coordinateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.dataEntryReducer;

export default coordinateSlice.reducer;
