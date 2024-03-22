import { toaster, sidebar, header, reloadCardsGrid, getRandomColor, reloadPercent } from "./modules/ui";
import Chart from 'chart.js/auto'
import { balanceDoughnut } from "./modules/ui";
import { getSymbols, postData, getData, patch } from "./modules/http";
import moment from "moment";
import { toProcentages } from "./modules/funcs";

sidebar()
header()

let user = JSON.parse(localStorage.getItem('user'))

const spending_chart = document.querySelector('#spending_chart')
const empty_chart = document.querySelector('#empty_chart')
const balance_doughnut = document.querySelector('#balance_doughnut')
const currencyList = document.querySelector('.currency_list')
const total_balance_view = document.querySelector('.total_balance_view')
let spending_total = document.querySelector('.spending_total')

function spendingChart(labels, totals) {
    new Chart(spending_chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'total',
                data: totals,
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

emptyChart()

let userNameView = document.querySelector('.user_name')
userNameView.innerHTML = `${user.name} ${user.surname}`

getData('/transactions?user_id=' + user.id)
    .then(res => {
        
        let filtered = res.data.filter(item => item.type === 'send')
        let spended = 0
        let spendedArr = []
        let dates =[]
      
        for (let item of filtered) {
            let dateMin = item.created_at.split(',').at(0)
            const date = `${dateMin.slice(0, 4)}-${dateMin.slice(4, 6)}-${dateMin.slice(6)}`
            spended += +item.total
            dates.push(date)
            spendedArr.push(item.total)
        }
        spendingChart(dates, spendedArr)
        spending_total.innerHTML = spended.toLocaleString('ru')
    })


const walletsGrid = document.querySelector('.wallets_grid')

getData('/wallets?user_id=' + user.id)
    .then(res => {
        reloadCardsGrid(res.data.slice(0, 4), walletsGrid)

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

const addWalletModal = document.querySelector('#add_wallet_modal')
const showModal = document.querySelector('.add_wallet_btn')
const closeModal = document.querySelector('.close_modal')

showModal.onclick = () => {
    addWalletModal.showModal()
}

closeModal.onclick = () => {
    addWalletModal.classList.replace('scaleFade', 'scaleFadeClose')

    setTimeout(() => {
        addWalletModal.classList.replace('scaleFadeClose', 'scaleFade')
        addWalletModal.close()
    }, 295)
}

const addWalletForm = document.forms.add_wallet_form
const currencySelect = addWalletForm.querySelector('select')

getSymbols()
    .then((symbols) => {
        for (let key in symbols) {
            let opt = new Option(`${key} - ${symbols[key]}`, key)

            currencySelect.append(opt)
        }
    })

addWalletForm.onsubmit = (e) => {
    e.preventDefault()

    addWalletModal.close()

    let fm = new FormData(e.target)
    let wallet = {
        created_at: moment().format("YYYYMMDD, HH:m"),
        updated_at: moment().format("YYYYMMDD, HH:m"),
        color: getRandomColor(),
        user_id: user.id
    }

    fm.forEach((value, key) => {
        wallet[key] = value
    })

    const { name, currency, balance } = wallet

    if (name && currency && balance) {
        postData('/wallets', wallet)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    toaster('Wallet Created!', 'massage')
                    getData('/wallets?user_id=' + user.id)
                        .then(res => reloadCardsGrid(res.data, walletsGrid))
                }
            })
    }
}



