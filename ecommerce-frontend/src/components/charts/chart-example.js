import React, { useState, useEffect } from "react";
import { Radar, Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { PieChart } from 'react-minimal-pie-chart';

import "./chart-example.css";
const ChartExample = () => {
  const [data, setData] = useState(
    // Bar data
    // labels: ["1", "2", "3", "4", "5","6","7","8","9","10","11","12"],
    // datasets: [
    //   {
    //     label: "Laptops",
    //     backgroundColor: "#ec1c23",
    //     data: [3, 4, 3, 33, 223, 12, 55, 2],
    //   },
    //   {
    //     label: "Accessories",
    //     backgroundColor: "#08526d",
    //     data: [43, 1, 2, 44, 12, 45, 77, 3],
    //   },
    // ]

    // Pie Data
   [ {title:"red",value:20,color:"red"},
    {title:"green",value:60,color:"green"},
    {title:"blue",value:20,color:"blue"}
  ]
  );

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <h1>Charts</h1>
      <div className="chart">
        {data && (
          <PieChart

            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default ChartExample;
