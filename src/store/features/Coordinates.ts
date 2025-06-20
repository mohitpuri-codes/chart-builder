import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app";

// Define a type for the slice state
interface CoordinateData {
  id: string;
  value: string;
}

interface Coordinates {
  XCoordinate: CoordinateData[];
  YCoordinate: CoordinateData[];
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
    // method to add X coordinates
    addXCoordinates: (state, action: PayloadAction<CoordinateData>) => {
      state.XCoordinate.push(action.payload);
    },
    // method to add Y coordinates
    addYCoordinates: (state, action: PayloadAction<CoordinateData>) => {
      state.YCoordinate.push(action.payload);
    },
    // method to delete the given data item
    deleteCoordinates: (state, action: PayloadAction<string>) => {
      state.XCoordinate = state.XCoordinate.filter(
        (data) => data.id !== action.payload
      );
      state.YCoordinate = state.YCoordinate.filter(
        (data) => data.id !== action.payload
      );
    },
  },
});

export const { addXCoordinates, addYCoordinates, deleteCoordinates } =
  coordinateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.dataEntryReducer;

export default coordinateSlice.reducer;
