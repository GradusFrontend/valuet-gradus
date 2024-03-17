import { toaster, sidebar, header } from "./modules/ui";
import Chart from 'chart.js/auto'
import { balanceDoughnut } from "./modules/ui";

sidebar()
header()

const spending_chart = document.querySelector('#spending_chart')
const empty_chart = document.querySelector('#empty_chart')
const balance_doughnut = document.querySelector('#balance_doughnut')

function spendingChart() {
    new Chart(spending_chart, {
        type: 'line',
        data: {
            labels: [8, 10, 12, 14, 16],
            datasets: [{
                label: 'total',
                data: [20, 40, 22, 30, 50, 42, 60],
                fill: false,
                borderColor: '#0097E8',
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
function emptyChart() {
    new Chart(empty_chart, {
        type: 'line',
        data: {
            labels: ['Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21', 'Nov 22'],
            datasets: [{
                label: 'total',
                data: [15000, 32000, 10000, 42000, 19000, 50000, 22000, 79000],
                fill: false,
                borderColor: '#0097E8',
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
balanceDoughnut(balance_doughnut)