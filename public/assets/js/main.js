document.addEventListener('DOMContentLoaded', function () {
    initTrendsChart();
    initChartControls();
});

// Initialize the trends line chart
function initTrendsChart() {
    const ctx = document.getElementById('trendsChart');

    if (!ctx) {
        console.warn('Trends chart canvas not found');
        return;
    }
    
// Chart data for Today and Yesterday
    const chartData = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
        datasets: [{
            label: 'Today',
            data: [10, 8, 12, 20, 18, 35, 42, 38, 25, 18, 32, 28, 15, 10, 22, 18, 38, 45, 42, 35, 28, 22, 18],
            borderColor: '#4361ee',
            backgroundColor: 'rgba(67, 97, 238, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: '#4361ee',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }, {
            label: 'Yesterday',
            data: [5, 7, 10, 18, 25, 30, 28, 22, 18, 25, 32, 28, 20, 15, 25, 30, 28, 22, 25, 20, 15, 12, 10],
            borderColor: '#9ca3af',
            backgroundColor: 'rgba(156, 163, 175, 0.05)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: '#9ca3af',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }]
    };

    // Chart configuration
    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 60,
                    ticks: {
                        stepSize: 10,
                        color: '#718096'
                    },
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#718096'
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    };
    window.trendsChart = new Chart(ctx, chartConfig);
}

// Toggle between Today and Yesterday chart views
function initChartControls() {
    const todayBtn = document.getElementById('todayBtn');
    const yesterdayBtn = document.getElementById('yesterdayBtn');

    if (!todayBtn || !yesterdayBtn || !window.trendsChart) {
        return;
    }

    // Today button click handler
    todayBtn.addEventListener('click', function () {
        todayBtn.classList.add('btn-primary');
        todayBtn.classList.remove('btn-outline-secondary');
        yesterdayBtn.classList.remove('btn-primary');
        yesterdayBtn.classList.add('btn-outline-secondary');

        window.trendsChart.data.datasets[0].hidden = false;
        window.trendsChart.data.datasets[1].hidden = true;
        window.trendsChart.update();
    });

    // Yesterday button click handler
    yesterdayBtn.addEventListener('click', function () {
        yesterdayBtn.classList.add('btn-primary');
        yesterdayBtn.classList.remove('btn-outline-secondary');
        todayBtn.classList.remove('btn-primary');
        todayBtn.classList.add('btn-outline-secondary');

        window.trendsChart.data.datasets[0].hidden = true;
        window.trendsChart.data.datasets[1].hidden = false;
        window.trendsChart.update();
    });
}
