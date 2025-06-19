import { Empty, Layout } from "antd";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import { Charts } from "./components/Chart/Charts";
import Sidebar from "./components/Sidebar/Sidebar";
import { ChartLegendsEnum } from "./types/chartType";
import { useAppSelector } from "./store/hooks/hooks";

const App = () => {
  const data = useAppSelector((state) => state.coordinateSlice.XCoordinate);
  return (
    <Layout className="main-layout">
      <Sidebar />
      <Layout>
        <Navbar />
        {data.length ? (
          <Charts
            className="chart"
            chartLegend={ChartLegendsEnum.Top}
            chartTitle="sample"
          />
        ) : (
          <Empty />
        )}
      </Layout>
    </Layout>
  );
};

export default App;
