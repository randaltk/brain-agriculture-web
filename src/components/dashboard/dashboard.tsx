"use-client";

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import {
  fetchTotalFarms,
  fetchCulturePieChart,
  fetchStatePieChart,
  fetchLandUsePieChart,
} from "../../services/api";
import "./Dashboard.css";

interface DashboardProps {}

interface TotalFarmsData {
  totalFarms: number;
  totalArea: number;
}

interface CulturePieChartData {
  culture: string;
  count: string;
}

interface StatePieChartData {
  state: string;
  count: string;
}

interface LandUsePieChartData {
  category: string;
  area: string;
}
const Dashboard: React.FC<DashboardProps> = () => {
  const [totalFarmsData, setTotalFarmsData] = useState<TotalFarmsData | null>(
    null
  );
  const [culturePieChartData, setCulturePieChartData] = useState<
    CulturePieChartData[]
  >([]);
  const [statePieChartData, setStatePieChartData] = useState<
    StatePieChartData[]
  >([]);
  const [landUsePieChartData, setLandUsePieChartData] = useState<
    LandUsePieChartData[]
  >([]);

  useEffect(() => {
    fetchTotalFarms()
      .then((data) => setTotalFarmsData(data))
      .catch((error) =>
        console.error("Error fetching total farms data:", error)
      );

    fetchCulturePieChart()
      .then((data) => setCulturePieChartData(data))
      .catch((error) =>
        console.error("Error fetching culture pie chart data:", error)
      );

    fetchStatePieChart()
      .then((data) => setStatePieChartData(data))
      .catch((error) =>
        console.error("Error fetching state pie chart data:", error)
      );

    fetchLandUsePieChart()
      .then((data) => setLandUsePieChartData(data))
      .catch((error) =>
        console.error("Error fetching land use pie chart data:", error)
      );
  }, []);

  return (
    <div className={"dashboardContainer"}>
      {totalFarmsData && (
        <>
          <h4>Total de fazendas</h4>
          <Chart
            width={"400px"}
            height={"300px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Metric", "Value"],
              ["Total Farms", totalFarmsData.totalFarms],
            ]}
            options={{
              title: "Total Farms",
              legend: "none",
              colors: ["#4285F4"],
            }}
          />

          <Chart
            width={"400px"}
            height={"300px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Metric", "Value"],
              ["Total Area", totalFarmsData.totalArea],
            ]}
            options={{
              title: "Total Area",
              legend: "none",
              colors: ["#34A853"],
            }}
          />

          <h4>Gráfico de pizza por cultura</h4>

          <Chart
            width={"400px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Culture", "Count"],
              ...culturePieChartData.map(({ culture, count }) => [
                culture,
                parseInt(count, 10),
              ]),
            ]}
            options={{
              title: "Culture Pie Chart",
            }}
          />

          <h4>Gráfico de pizza por estado</h4>
          <Chart
            width={"400px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["State", "Count"],
              ...statePieChartData.map(({ state, count }) => [
                state,
                parseInt(count, 10),
              ]),
            ]}
            options={{
              title: "State Pie Chart",
            }}
          />

          <h4>Gráfico de pizza por uso de solo</h4>
          <Chart
            width={"400px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Land Use", "Count"],
              ...landUsePieChartData.map(({ category, area }) => [
                category,
                parseInt(area, 10),
              ]),
            ]}
            options={{
              title: "Land Use Pie Chart",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
