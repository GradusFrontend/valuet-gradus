import { header, sidebar, toaster, getRandomColor, reloadTransactions } from '../../modules/ui'
import { getData, getSymbols, patch, postData } from '../../modules/http';
import Chart, { elements } from 'chart.js/auto'
import { balanceDoughnut } from '../../modules/ui';
import moment from 'moment/moment';

let user = JSON.parse(localStorage.getItem('user'))

sidebar()
header()

const transactionsWrap = document.querySelector('#transactions')

getData('/transactions?user_id=' + user.id)
    .then(res => {
        reloadTransactions(res.data, transactionsWrap)
    })

const addWalletModal = document.querySelector('#add_tran_modal')
const showModal = document.querySelector('.add_tran_btn')
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

const addTranForm = document.forms.add_wallet_form
const select = document.querySelector('#wallet')
const TypeSelect = document.querySelector('#type')
const total_inp = document.querySelector('#total')
let wallets = []
let selected_wallet = null

getData('/wallets?user_id=' + user.id)
    .then(res => {
        for (let item of res.data) {
            let opt = new Option(`${item.name}`, item.id)

            if (res.data.indexOf(item) === 0) {
                opt.selected = true
                selected_wallet = item
            }

            select.append(opt)
        }

        wallets = res.data
    })

select.onchange = (e) => {
    const id = e.target.value
    selected_wallet = wallets.find(el => el.id === id)
}

total_inp.onkeyup = (e) => {

    if (TypeSelect.value === "send") {
        const val = e.target.value

        if (+val > +selected_wallet.balance) {
            e.target.classList.add('error_input')
        } else {
            e.target.classList.remove('error_input')
        }
    }
}

addTranForm.onsubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(addTranForm);
    const transaction = {
        created_at: moment().format("YYYYMMDD, HH:m"),
        updated_at: moment().format("YYYYMMDD, HH:m"),
        user_id: user.id,
    };
    formData.forEach((val, key) => transaction[key] = val)

    if (total_inp.value > 0 && !total_inp.classList.contains('error_input')) {
        if (TypeSelect.value === 'send') {
            selected_wallet.balance = +selected_wallet.balance - +total_inp.value
        } else {
            selected_wallet.balance = +selected_wallet.balance + +total_inp.value
        }

        transaction.wallet_id = selected_wallet.id

        delete selected_wallet.user_id
        transaction.wallet = selected_wallet

        patch(`/wallets/${transaction.wallet_id}`, { balance: selected_wallet.balance })
            .then(res => {
                if (res.status === 200 || res.status === 201) {

                    postData('/transactions', transaction)
                        .then(res => {
                            if (res.status === 200 || res.status === 201) {
                                console.log(res.data);
                                e.target.reset()

                                getData('/transactions?user_id=' + user.id)
                                    .then(res => {
                                        reloadTransactions(res.data, transactionsWrap)
                                    })
                            } else { toaster('error', 'something went wrong') }
                        })
                } else { toaster('error', 'something went wrong') }
            })
    } else {
        toaster('not enough money!', 'error')
    }
}

