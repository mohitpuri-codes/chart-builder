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
import type { ChartLegendsEnum } from "../../types/chartType";
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

export interface ChartsProps {
  chartTitle: string;
  className?: string;

  chartLegend: ChartLegendsEnum;
}

export function Charts({ chartTitle, chartLegend }: ChartsProps) {
  const chartType = useAppSelector((state) => state.dataEntryReducer.chartType);
  const Xcoords = useAppSelector((state) => state.coordinateSlice.XCoordinate);
  const Ycoords = useAppSelector((state) => state.coordinateSlice.YCoordinate);

  const data = useMemo(
    () => ({
      labels: Xcoords,
      datasets: [
        {
          label: "Dataset 1",
          data: Ycoords,
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
              position: chartLegend,
            },
            title: {
              display: true,
              text: chartTitle,
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [chartTitle, chartType, data, chartLegend]);

  return (
    <div className="chart-wrapper">
      <canvas className="chart" ref={canvasRef}></canvas>
    </div>
  );
}
