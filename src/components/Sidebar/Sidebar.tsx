import { Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { PieChartOutlined } from "@ant-design/icons";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

interface SidebarProps {
  setChartType: (value: "bar" | "line" | "pie") => void;
}

function Sidebar({ setChartType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    onChange?: () => void,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick: onChange,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem("Graph View", "sub1", undefined, <PieChartOutlined />, [
      getItem("Bar Chart", "4", () => setChartType("bar")),
      getItem("Pie Chart", "3", () => setChartType("pie")),
      getItem("Line Chart", "5", () => setChartType("line")),
    ]),
  ];
  return (
    <Sider
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
