import React, { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useSidebar } from "../Context/SidebarContext";
import { Doughnut, Bubble } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables } from "chart.js";
ChartJS.register(...registerables);

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomData = (length) => {
  const labels = Array.from({ length }, (_, index) => `Music ${index + 1}`);
  const doughnutData = Array.from({ length }, () => Math.random() * 100);
  const bubbleData = Array.from({ length }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 20,
  }));
  return { labels, doughnutData, bubbleData };
};

const initialChartData = generateRandomData(5);

const Home = () => {
  const { collapsed, handleToggleCollapse } = useSidebar();
  const [activeTab, setActiveTab] = useState("albums");
  const [chartData, setChartData] = useState(initialChartData);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] w-full bg-black">
      <div
        className="absolute top-4 left-0 transition-transform transform"
        style={{ transform: `translateX(${collapsed ? "0" : "64px"})` }}
      >
        <IconArrowRight
          className="text-yellow-400 h-10 w-10 cursor-pointer"
          onClick={handleToggleCollapse}
        />
      </div>
      <div className="flex items-center justify-center p-4">
        <div
          className={`cursor-pointer ${
            activeTab === "albums" ? "text-yellow-400" : "text-white"
          }`}
          onClick={() => handleTabChange("albums")}
        >
          Albums Stats
        </div>
        <div
          className={`cursor-pointer ml-4 ${
            activeTab === "musics" ? "text-yellow-400" : "text-white"
          }`}
          onClick={() => handleTabChange("musics")}
        >
          Musics Stats
        </div>
      </div>
      {activeTab === "albums" && (
        <div className="text-white flex items-center justify-center flex-1">
          <div style={{ width: "400px", height: "400px" }}>
            <Doughnut
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    data: chartData.doughnutData,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                      color: "white",
                    },
                  },
                },
                cutout: '60%',
              }}
            />
          </div>
        </div>
      )}
      {activeTab === "musics" && (
        <div className="text-white flex items-center justify-center flex-1">
          <div style={{ width: "400px", height: "400px" }}>
            <Bubble
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Music Stats",
                    data: chartData.bubbleData,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>    
        </div>
      )}
    </div>
  );
};

export default Home;
