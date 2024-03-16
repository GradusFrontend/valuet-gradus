import { toaster, sidebar, header } from "./modules/ui";
import Chart from 'chart.js/auto'

sidebar()
header()

const spending_chart = document.querySelector('#spending_chart')
const empty_chart = document.querySelector('#empty_chart')

// const config = {
//     type: 'line',
//     data: data,
// };
// const data = {
//     labels: labels,
//     datasets: [{
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//     }]
// };
function spendingChart() {
    new Chart(spending_chart, {
        type: 'line',
        data: {
            labels: [8, 10, 12, 14, 16],
            datasets: [{
                label: 'total',
                data: [20, 40, 22, 30, 50, 42, 60],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
console.log(empty_chart);
function emptyChart() {
    new Chart(empty_chart, {
        type: 'line',
        data: {
            labels: ['Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21', 'Nov 22'],
            datasets: [{
                label: 'total',
                data: [15000, 32000, 10000, 42000, 19000, 50000, 22000, 79000],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
spendingChart()
emptyChart()