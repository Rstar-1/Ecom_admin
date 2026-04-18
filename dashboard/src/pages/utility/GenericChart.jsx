import React from "react";
import Chart from "react-apexcharts";

const GenericChart = ({
  type = "bar",
  series = [],
  categories = [],
  height = 350,
  colors = [],
  options: customOptions = {},
}) => {
  
  const baseOptions = {
    chart: {
      type,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },

    dataLabels: { enabled: false },

    stroke: {
      curve: "smooth",
      width: 2,
    },

    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#6B7280",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
        },
        formatter: (val) => `₹${val.toLocaleString()}`, // 💰 eCommerce currency
      },
    },

    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
    },

    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },

    colors: colors.length
      ? colors
      : ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],

    legend: {
      position: "top",
      labels: {
        colors: "#374151",
      },
    },
  };

  // Chart-specific overrides
  const typeOptions = {
    bar: {
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          borderRadius: 6,
        },
      },
    },

    line: {},

    area: {
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
    },

    donut: {
      labels: categories,
      legend: { position: "bottom" },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
          },
        },
      },
    },

    radialBar: {
      plotOptions: {
        radialBar: {
          hollow: { size: "60%" },
          dataLabels: {
            value: {
              formatter: (val) => `${val}%`,
            },
          },
        },
      },
      labels: categories,
    },
  };

  // 🔥 Merge everything properly
  const finalOptions = {
    ...baseOptions,
    ...(typeOptions[type] || {}),
    ...customOptions, // allow override from parent
  };

  return (
    <Chart
      options={finalOptions}
      series={series}
      type={type}
      height={height}
    />
  );
};

export default GenericChart;