import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  type ChartData,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
} from "chart.js";
import { useEffect, useRef } from "react";
import type { ChartLegendsEnum, ChartTypeEnum } from "../../types/chartType";

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
  data?: ChartData;
  chartType: ChartTypeEnum;
  chartLegend: ChartLegendsEnum;
}

export function Charts({
  chartTitle,
  data,
  chartType,
  chartLegend,
}: ChartsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const myChart = new ChartJS(canvasRef.current, {
        type: chartType || "bar",
        data: data || { datasets: [], labels: [] },
        options: {
          responsive: true,
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
