import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Airplane from "./Airplane";
import { Chart, ArcElement } from "chart.js/auto";
Chart.register(ArcElement);

interface Props {
  airplanes: Airplane[];
}

function PieChart({ airplanes }: Props) {
  const [airplaneData, setAirplaneData] = useState({
    labels: airplanes.map((airplane) => airplane.model + " " + airplane.type),
    datasets: [
      {
        label: "Capacity",
        data: airplanes.map((airplane) => airplane.capacity),
        backgroundcolor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    setAirplaneData({
      labels: airplanes.map((airplane) => airplane.model + " " + airplane.type),
      datasets: [
        {
          label: "Capacity",
          data: airplanes.map((airplane) => airplane.capacity),
          backgroundcolor: "rgba(75,192,192,1)",
        },
      ],
    });
  }, [airplanes]);
  return <Pie data={airplaneData} />;
}

export default PieChart;
