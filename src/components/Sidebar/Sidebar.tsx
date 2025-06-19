import { Button, Modal, Radio, Typography, type RadioChangeEvent } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { ChartTypeEnum } from "../../types/chartType";
import DataTable from "../Table/DataTable";
import { useAppSelector, useAppDispatch } from "../../store/hooks/hooks";
import { selectChartType } from "../../store/features/ChartSelection";

function Sidebar() {
  const chartType = useAppSelector((state) => state.dataEntryReducer.chartType);
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: RadioChangeEvent) => {
    const chartType = e.target.value;
    dispatch(selectChartType(chartType));
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

          <div>
            <Button onClick={() => setModalOpen(true)}>Add Data</Button>
            <Modal
              title="Add Coordinates for the X-Y plane"
              centered
              open={modalOpen}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            >
              <DataTable />
            </Modal>
          </div>
        </div>
      )}
    </Sider>
  );
}

export default Sidebar;
