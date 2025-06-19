import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app";
import { ChartTypeEnum } from "../../types/chartType";

// Define a type for the slice state
interface DataEntry {
  chartType: ChartTypeEnum;
}

// Define the initial state using that type
const initialState: DataEntry = {
  chartType: ChartTypeEnum.Bar,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    selectChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const { selectChartType } = chartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.dataEntryReducer;

export default chartSlice.reducer;
