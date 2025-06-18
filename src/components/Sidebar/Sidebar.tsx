import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { PieChartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ChartTypeEnum } from "../../types/chartType";
import { type MenuItem, getItem } from "../../utils/antd functions/getMenuItem";

interface SidebarProps {
  setChartType: (value: ChartTypeEnum) => void;
}

function Sidebar({ setChartType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    getItem("Graph View", "sub1", undefined, <PieChartOutlined />, [
      getItem("Bar Chart", "4", () => setChartType(ChartTypeEnum.Bar)),
      getItem("Pie Chart", "3", () => setChartType(ChartTypeEnum.Pie)),
      getItem("Line Chart", "5", () => setChartType(ChartTypeEnum.Line)),
    ]),
  ];
  return (
    <Sider
      width="280px"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ margin: 0 }}
      />
    </Sider>
  );
}

export default Sidebar;

// aside {
//   width: 250px !important;
//   min-width: 250px !important;
//   max-width: 250px !important;
// }

// aside div {
//   width: 250px !important;
//   min-width: 250px !important;
//   max-width: 250px !important;
// }
