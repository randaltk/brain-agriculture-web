"use-client";

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { fetchTotalFarms, fetchCulturePieChart } from "../../services/api";
import styles from "./Dashboard.module.css";

interface DashboardProps {}

interface TotalFarmsData {
  totalFarms: number;
  totalArea: number;
}

interface CulturePieChartData {
  culture: string;
  count: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [totalFarmsData, setTotalFarmsData] = useState<TotalFarmsData | null>(
    null
  );
  const [culturePieChartData, setCulturePieChartData] = useState<
    CulturePieChartData[]
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
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {totalFarmsData && (
        <div className={styles.totalFarmsContainer}>
          <p>Total Farms: {totalFarmsData.totalFarms}</p>
          <p>Total Area: {totalFarmsData.totalArea}</p>
        </div>
      )}

      <h2>Culture Pie Chart</h2>
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
    </div>
  );
};

export default Dashboard;
