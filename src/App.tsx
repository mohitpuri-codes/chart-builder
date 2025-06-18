import { useState } from "react";
import { Layout } from "antd";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import { Charts } from "./components/Chart/Charts";
import type { ChartData } from "chart.js";
import Sidebar from "./components/Sidebar/Sidebar";
import { ChartLegendsEnum, ChartTypeEnum } from "./types/chartType";

const App = () => {
  const [chartType, setChartType] = useState<ChartTypeEnum>(ChartTypeEnum.Bar);

  const chartData: ChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30, 40, 50],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout className="main-layout">
      <Sidebar setChartType={setChartType} />
      <Layout>
        <Navbar />
        <Charts
          className="chart"
          data={chartData}
          chartLegend={ChartLegendsEnum.Top}
          chartTitle="sample"
          chartType={chartType}
        />
      </Layout>
    </Layout>
  );
};

export default App;
