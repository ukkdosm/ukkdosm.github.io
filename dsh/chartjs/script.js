// Define data set for all charts
let dataBaby = [23.9,
19.5,
11.9,
14.3,
8.2,
6.8,
6.4
];
let moreDataBaby = [19.5,
12.4,
9.0,
8.8,
7.3,
6.1,
4.3
];
myData = {
        labels: ["Sabah", "Kelantan", "Sarawak", "Kedah", "Perak", "Terengganu", "N Sembilan"],
        datasets: [
          {
            label: "2016",
            fill: false,
            backgroundColor: 'rgb(190, 99, 255, 0.25)',
            borderColor: 'rgb(190, 99, 255)',
            data: dataBaby,
          },
            {
            label: "2019",
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderColor: 'rgb(255, 99, 132)',
            data: moreDataBaby,
        }]
    };

// Default chart defined with type: 'line'
Chart.defaults.global.defaultFontFamily = "monospace";
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: myData
});

// Function runs on chart type select update
function updateChartType() {
  // Since you can't update chart type directly in Charts JS you must destroy original chart and rebuild
   myChart.destroy();
   myChart = new Chart(ctx, {
     type: document.getElementById("chartType").value,
     data: myData,
   });
};



