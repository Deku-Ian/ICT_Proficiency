(function () {
  const handson_PieChart = document.getElementById("handsonPieChart");

  Chart.register(ChartDataLabels);
  let myChart;

  const updatePieCharts = (passedCount, failedCount) => {
    const data = {
      labels: ["Passed Applicants", "Failed Applicants"],
      datasets: [
        {
          label: "Handson Results",
          data: [passedCount, failedCount],
          backgroundColor: ["#18a843", "#990e23"],
          hoverOffset: 2,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
          datalabels: {
            formatter: (value, ctx) => {
              const datapoints = ctx.chart.data.datasets[0].data;
              const total = datapoints.reduce(
                (total, datapoint) => total + datapoint,
                0
              );
              const percentage = ((value / total) * 100).toFixed(2) + "%";
              return percentage;
            },
            color: "#fff",
            font: {
              weight: "bold",
              size: 12,
            },
          },
        },
      },
    };

    if (!myChart) {
      myChart = new Chart(handson_PieChart, config);
    } else {
      myChart.data = data;
      myChart.update();
    }
  };
  var passedCount = parseInt(document.getElementById('passed-summary').innerText);
  var failedCount = parseInt(document.getElementById('failed-summary').innerText);
  updatePieCharts(passedCount, failedCount);
})();