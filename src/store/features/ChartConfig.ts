import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app";
import { ChartLegendsEnum } from "../../types/chartType";

// Define a type for the slice state
interface ChartConfig {
  legendPosition: ChartLegendsEnum;
  chartTitle: string;
}

// Define the initial state using that type
const initialState: ChartConfig = {
  legendPosition: ChartLegendsEnum.Top,
  chartTitle: "",
};

export const chartConfigSlice = createSlice({
  name: "chart configs",
  initialState,
  reducers: {
    selectLegendPosition: (state, action: PayloadAction<ChartLegendsEnum>) => {
      state.legendPosition = action.payload;
    },
    addChartTitle: (state, action: PayloadAction<string>) => {
      state.chartTitle = action.payload;
    },
  },
});

export const { selectLegendPosition, addChartTitle } = chartConfigSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chartConfig;

export default chartConfigSlice.reducer;
