import { Empty, Layout } from "antd";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import { Charts } from "./components/Chart/Charts";
import Sidebar from "./components/Sidebar/Sidebar";

import { useAppSelector } from "./store/hooks/hooks";
import { useMemo } from "react";
import { Context } from "./components/Table/DataTable";

const App = () => {
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const data = useAppSelector((state) => state.coordinateSlice.XCoordinate);
  return (
    <Context.Provider value={contextValue}>
      <Layout className="main-layout">
        <Sidebar />
        <Layout>
          <Navbar />
          {data.length ? <Charts /> : <Empty />}
        </Layout>
      </Layout>
    </Context.Provider>
  );
};

export default App;
