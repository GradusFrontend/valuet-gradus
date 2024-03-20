import { header, sidebar, toaster, getRandomColor, reloadCardTransactions, reloadWallets } from '../../modules/ui'
import Chart from 'chart.js/auto'
import { balanceDoughnut } from '../../modules/ui';
import moment from 'moment/moment';

const balance_doughnut = document.querySelector('#total_chart')

balanceDoughnut(balance_doughnut)
sidebar()
header()

const wallets_box = document.querySelector('.wallets')

wallets_box.addEventListener('wheel', function (event) {
    const delta = Math.sign(event.deltaY);
    this.scrollLeft += delta * 40;
    event.preventDefault();
});

const transactions_chart = document.querySelector('#transactions_chart')
function transactionsChart() {
    new Chart(transactions_chart, {
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

transactionsChart()

const tranWrap = document.querySelector('.transactions')
const walletsWrap = document.querySelector('.wallets')

reloadCardTransactions([{
    total: 83773,
    type: 'send',
    created_at: moment().format("YYYYMMDD, HH:m"),
    wallet: {
        name: 'visa',
        currency: 'USD'
    }
}], tranWrap)

reloadWallets([{
    name: 'Gradus',
    balance: 373635,
    currency: 'UAR',
    color: getRandomColor('0.5')
}, ] , walletsWrap)





