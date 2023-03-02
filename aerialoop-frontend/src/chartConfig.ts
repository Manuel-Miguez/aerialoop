export const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    intersect: false,
  },
};

const footer = (tooltipItems: any) => {
  let sum = 0;
  tooltipItems.forEach((tooltipItem: any) => {
    sum += tooltipItem.parsed.y;
  });
  return "Sum: " + sum;
};

export const plugins = [
  {
    tooltip: {
      callbacks: {
        footer: footer,
      },
    },
  },
];
