import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
} from "chart.js";
import { useEffect, useMemo, useRef } from "react";

import { useAppSelector } from "../../store/hooks/hooks";

ChartJS.register(
  BarController,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend
);

export function Charts() {
  const chartType = useAppSelector((state) => state.dataEntryReducer.chartType);
  const Xcoords = useAppSelector((state) => state.coordinateSlice.XCoordinate);
  const Ycoords = useAppSelector((state) => state.coordinateSlice.YCoordinate);
  const legendPosition = useAppSelector(
    (state) => state.chartConfig.legendPosition
  );
  const title = useAppSelector((state) => state.chartConfig.chartTitle);

  const data = useMemo(
    () => ({
      labels: Xcoords.map((XcoordsItem) => XcoordsItem.value),
      datasets: [
        {
          label: "Dataset 1",
          data: Ycoords.map((YcoordsItem) => YcoordsItem.value),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }),
    [Xcoords, Ycoords]
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const myChart = new ChartJS(canvasRef.current, {
        type: chartType || "bar",
        data: data || { datasets: [], labels: [] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: legendPosition,
            },
            title: {
              display: true,
              text: title,
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [chartType, data, legendPosition, title]);

  return (
    <div className="chart-wrapper">
      <canvas className="chart" ref={canvasRef}></canvas>
    </div>
  );
}
