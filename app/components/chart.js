import React, {useEffect, useRef, useState} from 'react';
import Chartjs from 'chart.js';

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;


const Chart = (props) => {
  const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];
  let backgroundColorArray = [];
  const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];
  let borderColorArray = [];
  while (backgroundColorArray.length < props.labels.length) {
    backgroundColorArray = backgroundColorArray.concat(backgroundColor);
    borderColorArray = borderColorArray.concat(borderColor);
  }
  const chartConfig = {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.questionTitle,
          data: props.data,
          backgroundColor: backgroundColorArray,
          borderColor: borderColorArray,
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          left: 150,
          right: 150,
          top: 100,
          bottom: 100,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const onButtonClick = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt()
    ];
    updateDataset(0, data);
  };

  return (
    <div >
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;
