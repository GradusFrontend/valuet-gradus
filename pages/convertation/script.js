import { header, sidebar, toaster, getRandomColor } from '../../modules/ui'
import Chart from 'chart.js/auto'
import { balanceDoughnut } from '../../modules/ui';
import { getData, getSymbols, patch, postData } from '../../modules/http';
import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'))

sidebar()
header()

let convert_form = document.forms.convert_form
let from_select = document.querySelector('#from_select')
let to_select = document.querySelector('#to_select')
let selected_wallet = null
let from_total_num = document.querySelector('.from_total_num')
let from_total_currency = document.querySelector('.from_total_currency')
let to_total_num = document.querySelector('.to_total_num')
let to_total_currency = document.querySelector('.to_total_currency')
let wallets = []

getSymbols()
    .then((symbols) => {
        for (let key in symbols) {
            let opt = new Option(`${key} - ${symbols[key]}`, key)

            to_select.append(opt)
        }
    })



getData('/wallets?user_id=' + user.id)
    .then(res => {
        for (let item of res.data) {
            let opt = new Option(`${item.name}`, item.id)

            if (res.data.indexOf(item) === 0) {
                opt.selected = true
                selected_wallet = item
                from_total_currency.innerHTML = item.currency
                from_total_num.innerHTML = item.balance.toLocaleString('ru')

                axios.get(`https://api.apilayer.com/fixer/convert?to=aed&from=${selected_wallet.currency}&amount=${selected_wallet.balance}`, {
                    redirect: 'follow',
                    headers: {
                        "apikey": import.meta.env.VITE_API_KEY
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        to_total_num.innerHTML = res.data.result
                        to_total_currency.innerHTML = res.data.query.to
                    })
            }

            from_select.append(opt)
        }

        wallets = res.data
    })

// axios.get(`https://api.apilayer.com/fixer/convert?to=aed&from=${selected_wallet.currency}&amount=${selected_wallet.balance}`, {
//     redirect: 'follow',
//     headers: {
//         "apikey": import.meta.env.VITE_API_KEY
//     }
// })
//     .then(res => {
//         to_total_num.innerHTML = res.data.result
//         to_total_currency.innerHTML = res.data.query.to
//     })

from_select.onchange = (e) => {
    const id = e.target.value
    selected_wallet = wallets.find(el => el.id === id)
    from_total_currency.innerHTML = selected_wallet.currency
    from_total_num.innerHTML = selected_wallet.balance.toLocaleString('ru')
}

let selected_currency = null

to_select.onchange = (e) => {
    selected_currency = e.target.value

    axios.get(`https://api.apilayer.com/fixer/convert?to=${selected_currency}&from=${selected_wallet.currency}&amount=${selected_wallet.balance}`, {
        redirect: 'follow',
        headers: {
            "apikey": import.meta.env.VITE_API_KEY
        }
    })
        .then(res => {
            to_total_num.innerHTML = res.data.result
            to_total_currency.innerHTML = res.data.query.to
        })
}

convert_form.onsubmit = (e) => {
    e.preventDefault()

    axios.get(`https://api.apilayer.com/fixer/convert?to=${selected_currency}&from=${selected_wallet.currency}&amount=${selected_wallet.balance}`, {
        redirect: 'follow',
        headers: {
            "apikey": import.meta.env.VITE_API_KEY
        }
    })
        .then(res => {
            console.log(res.data);
        })
}
