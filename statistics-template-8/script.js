function mean(arr) {
  return arr.reduce((a,b) => a+b,0) / arr.length;
}

function median(arr) {
  const sorted = [...arr].sort((a,b) => a-b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid-1] + sorted[mid]) / 2;
}

function stdDev(arr) {
  const avg = mean(arr);
  const squareDiffs = arr.map(value => Math.pow(value - avg, 2));
  const avgSquareDiff = mean(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    drawChart();
    drawChart2();
}

// =======================
// SÖMN
// =======================
function drawChart() {
    const chartData = [
        ['Sömn', 'Depression'],
        ['5-6 timmar', 0.568],
        ['7-8 timmar', 0.595],
        ['Mindre än 5 timmar', 0.645],
        ['Mer än 8 timmar', 0.509],
        ['Övrigt', 0.50]
    ];

    const values = chartData.slice(1).map(row => row[1]);

    const avg = mean(values);
    const med = median(values);
    const std = stdDev(values);

    document.getElementById("outputSleep").innerHTML =
        "Medelvärde: " + avg.toFixed(2) +
        "<br>Median: " + med.toFixed(2) +
        "<br>Standardavvikelse: " + std.toFixed(2);

    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
        title: 'Sömn vs Depression',
        legend: { position: 'none' },

        hAxis: {
            title: 'Sömntid'
        },

        vAxis: {
            title: 'Depressionsnivå',
            viewWindow: { min: 0 }
        },

        annotations: {
            textStyle: {
                fontSize: 0
            }
        },

        bar: { groupWidth: "60%" }
    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('chart')
    );

    chart.draw(data, options);
}


// =======================
// AKADEMISK PRESS
// =======================
function drawChart2() {
    const chartData2 = [
        ['Pressnivå', 'Depression'],
        [1, 0.54],
        [2, 0.55],
        [3, 0.57],
        [4, 0.55],
        [5, 0.60]
    ];

    const values = chartData2.slice(1).map(row => row[1]);

    const avg = mean(values);
    const med = median(values);
    const std = stdDev(values);

    document.getElementById("outputPressure").innerHTML =
        "Medelvärde: " + avg.toFixed(2) +
        "<br>Median: " + med.toFixed(2) +
        "<br>Standardavvikelse: " + std.toFixed(2);
    var data = google.visualization.arrayToDataTable(chartData2);

    var options = {
        title: 'Akademisk press vs Depression',
        legend: { position: 'none' },

        hAxis: {
            title: 'Pressnivå (1–5)'
        },

        vAxis: {
            title: 'Depressionsnivå',
            viewWindow: { min: 0 }
        },

        bar: { groupWidth: "60%" }
    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('chart2')
    );

    chart.draw(data, options);
}