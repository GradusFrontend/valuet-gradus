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

const transactions_chart_box = document.querySelector('.transactions_chart_box')
const transactions_chart = document.querySelector('.transactions_chart').remove()

let transactionsChart = (place, labels, numbers) => new Chart(place, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'total',
            data: numbers,
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

const tranWrap = document.querySelector('.transactions')
const walletsWrap = document.querySelector('.wallets')

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

        if (location.search === '') {
            getData('/transactions?wallet_id=' + res.data[0].id)
                .then(res => {
                    let filtered = res.data.filter(item => item.type === 'send')
                    let spendedArr = []
                    let dates = []

                    reloadCardTransactions(res.data, tranWrap)
                    for (let item of filtered) {
                        let dateMin = item.created_at.split(',').at(0)
                        const date = `${dateMin.slice(0, 4)}-${dateMin.slice(4, 6)}-${dateMin.slice(6)}`
                        dates.push(date)
                        spendedArr.push(item.total)
                    }

                    let canvas = document.createElement('canvas')
                    canvas.id = res.data[0].wallet_id
                    canvas.classList.add('transactions_chart')
                    transactions_chart_box.append(canvas)

                    transactionsChart(canvas, dates, spendedArr)
                })
        }
    })

if (location.search !== '') {
    let id = location.search.split('=').at(-1)

    getData('/transactions?wallet_id=' + id)
        .then(res => {
            console.log(res.data);

            let filtered = res.data.filter(item => item.type === 'send')
            let spendedArr = []
            let dates = []


            reloadCardTransactions(res.data, tranWrap)
            for (let item of filtered) {
                let dateMin = item.created_at.split(',').at(0)
                const date = `${dateMin.slice(0, 4)}-${dateMin.slice(4, 6)}-${dateMin.slice(6)}`
                dates.push(date)
                spendedArr.push(item.total)
            }

            let canvas = document.createElement('canvas')
            canvas.id = res.data[0].wallet_id
            canvas.classList.add('transactions_chart')
            transactions_chart_box.append(canvas)

            transactionsChart(canvas, dates, spendedArr)
        })
}






