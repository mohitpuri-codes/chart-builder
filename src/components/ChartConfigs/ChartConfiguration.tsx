import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { ChartLegendsEnum } from "../../types/chartType";
import {
  addChartTitle,
  selectLegendPosition,
} from "../../store/features/ChartConfig";

const { Option } = Select;

const ChartConfiguration = () => {
  const dispatch = useAppDispatch();
  const chartConfig = useAppSelector((state) => state.chartConfig);
  const handleChange = (value: ChartLegendsEnum) => {
    dispatch(selectLegendPosition(value));
  };

  return (
    <>
      <div className="flex-configs">
        <label htmlFor="legend">Select Legend Position:</label>
        <Select
          id="legend"
          value={chartConfig.legendPosition}
          className="drop-down"
          onChange={handleChange}
        >
          <Option value={ChartLegendsEnum.Left}>Left</Option>
          <Option value={ChartLegendsEnum.Right}>Right</Option>
          <Option value={ChartLegendsEnum.Bottom}>Bottom</Option>
          <Option value={ChartLegendsEnum.Top}>Top</Option>
        </Select>
      </div>

      <div className="flex-configs">
        <label htmlFor="title">Enter Chart Title:</label>
        <Input
          id="title"
          placeholder="Title..."
          onBlur={(e) => dispatch(addChartTitle(e.target.value))}
        />
      </div>
    </>
  );
};

export default ChartConfiguration;
