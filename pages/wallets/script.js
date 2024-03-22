import { header, sidebar, toaster, getRandomColor, reloadCardTransactions, reloadWallets, reloadPercent } from '../../modules/ui'
import Chart from 'chart.js/auto'
import { balanceDoughnut } from '../../modules/ui';
import moment from 'moment/moment';
import { getData, patch, postData, getSymbols } from '../../modules/http';
import { toProcentages } from '../../modules/funcs';


let user = JSON.parse(localStorage.getItem('user'))

const balance_doughnut = document.querySelector('#total_chart')

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

const currencyList = document.querySelector('.currency_list')
const total_balance_view = document.querySelector('.total_balance')

getData('/wallets?user_id=' + user.id)
    .then(res => {
        reloadWallets(res.data, walletsWrap)

        let totalBalance = 0
        let colours = []
        let balanceArr = []
        let labels = []
        res.data.forEach(item => {
            totalBalance += +item.balance
            balanceArr.push(+item.balance)
            colours.push(item.color.full)
            labels.push(item.name)
        })
        total_balance_view.innerHTML = totalBalance
        balanceDoughnut(balance_doughnut, balanceArr, labels, colours)
        reloadPercent(currencyList, res.data, toProcentages(balanceArr))
    })




