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

interface XYCoordinatesAction {
  id: string;
  XCoordinateValue: string;
  YCoordinateValue: string;
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
    // method to add the XY coordinates
    addXYCoordinates: (state, action: PayloadAction<XYCoordinatesAction>) => {
      state.XCoordinate.push({
        id: action.payload.id,
        value: action.payload.XCoordinateValue,
      });
      state.YCoordinate.push({
        id: action.payload.id,
        value: action.payload.YCoordinateValue,
      });
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

export const { addXYCoordinates, deleteCoordinates } = coordinateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.dataEntryReducer;

export default coordinateSlice.reducer;
