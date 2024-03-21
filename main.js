import { toaster, sidebar, header, reloadCardsGrid, getRandomColor, reloadPercent } from "./modules/ui";
import Chart from 'chart.js/auto'
import { balanceDoughnut } from "./modules/ui";
import { getSymbols, postData, getData, patch } from "./modules/http";
import moment from "moment";

sidebar()
header()

let user = JSON.parse(localStorage.getItem('user'))

const spending_chart = document.querySelector('#spending_chart')
const empty_chart = document.querySelector('#empty_chart')
const balance_doughnut = document.querySelector('#balance_doughnut')
const currencyList = document.querySelector('.currency_list')
const total_balance_view = document.querySelector('.total_balance_view')

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
// balanceDoughnut(balance_doughnut)


let userNameView = document.querySelector('.user_name')
userNameView.innerHTML = `${user.name} ${user.surname}`

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

export function toProcentages(arr) {
    let total = 0
    for (let item of arr) {
        total += item
    }
    return arr.map(function (x) {
        return parseFloat((x * 100 / total).toFixed(2))
    })
}

