import { Radio, Typography, type RadioChangeEvent } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { ChartTypeEnum } from "../../types/chartType";

interface SidebarProps {
  setChartType: (value: ChartTypeEnum) => void;
  chartType: string;
}

function Sidebar({ setChartType, chartType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (e: RadioChangeEvent) => {
    const chartType = e.target.value;
    setChartType(chartType);
  };

  return (
    <Sider
      width="280px"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      {!collapsed && (
        <div className="radio-group">
          <Radio.Group
            onChange={(e: RadioChangeEvent) => handleChange(e)}
            value={chartType}
            className="radio-wrapper"
          >
            <Typography className="select-header">Show Data in:</Typography>
            <Radio defaultChecked value={ChartTypeEnum.Bar} className="radio">
              Bar Chart
            </Radio>
            <Radio className="radio" value={ChartTypeEnum.Pie}>
              Pie Chart
            </Radio>
            <Radio className="radio" value={ChartTypeEnum.Line}>
              Line Chart
            </Radio>
          </Radio.Group>
        </div>
      )}
    </Sider>
  );
}

export default Sidebar;
