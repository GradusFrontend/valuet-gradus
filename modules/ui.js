import { Chart } from "chart.js"
import 'chartjs-plugin-datalabels'
import moment from "moment/moment"

export function toaster(text, type) {
  const custom_alert = document.createElement('div')
  const time_bar = document.createElement('div')

  custom_alert.classList.add('toaster', `toaster_${type}`)
  custom_alert.classList.add('toaster-anim')
  time_bar.classList.add('time_bar')
  custom_alert.innerHTML = text

  custom_alert.append(time_bar)

  document.body.append(custom_alert)

  setTimeout(() => {
    custom_alert.remove()
  }, 5000)
}

const wrapper = document.querySelector('.wrapper')
const wrap = document.querySelector('.wrap')


export function sidebar() {
  let sidebar = document.createElement('div')
  let top_sidebar = document.createElement('div')
  let bottom_sidebar = document.createElement('div')
  let logo = document.createElement('img')
  let pagesList = document.createElement('div')

  let line = document.createElement('div')

  let account = document.createElement('div')
  let avatar = document.createElement('div')
  let userName = document.createElement('h3')

  let logOut = document.createElement('div')
  let logOutIcon = document.createElement('img')
  let logOutTitle = document.createElement('a')

  // main
  let mainLink = document.createElement('a')
  let mainBlock = document.createElement('div')
  let mainIcon = document.createElement('img')
  let mainTitle = document.createElement('h3')

  // wallets
  let walletsLink = document.createElement('a')
  let walletsBlock = document.createElement('div')
  let walletsIcon = document.createElement('img')
  let walletsTitle = document.createElement('h3')

  // transactions
  let tranLink = document.createElement('a')
  let tranBlock = document.createElement('div')
  let tranIcon = document.createElement('img')
  let tranTitle = document.createElement('h3')

  // convert
  let convertLink = document.createElement('a')
  let convertBlock = document.createElement('div')
  let convertIcon = document.createElement('img')
  let convertTitle = document.createElement('h3')

  // market
  let marketLink = document.createElement('a')
  let marketBlock = document.createElement('div')
  let marketIcon = document.createElement('img')
  let marketTitle = document.createElement('h3')

  sidebar.classList.add('sidebar')
  top_sidebar.classList.add('top_sidebar')
  bottom_sidebar.classList.add('bottom_sidebar')
  logo.classList.add('logo')
  pagesList.classList.add('pages_list')
  logo.alt = 'logo'

  // main classes
  mainLink.id = 'main_link'
  mainBlock.classList.add('main_link', 'page_link')

  // wallets classes
  walletsLink.id = 'wallets_link'
  walletsBlock.classList.add('wallets_link', 'page_link')

  // transactions
  tranLink.id = 'tran_link'
  tranBlock.classList.add('tran_link', 'page_link')

  // convert
  convertLink.id = 'convert_link'
  convertBlock.classList.add('convert_link', 'page_link')

  // market
  marketLink.id = 'market_link'
  marketBlock.classList.add('market_link', 'page_link')


  logo.src = '/public/icons/valuet-icon.svg'

  // main
  mainIcon.src = '/public/icons/main-icon.svg'
  mainIcon.alt = 'main icon'
  mainTitle.innerHTML = 'Overview'
  mainLink.href = '/'

  // transactions
  tranIcon.src = '/public/icons/transactions-icon.svg'
  tranIcon.alt = 'tran'
  tranTitle.innerHTML = 'Transactions'
  tranLink.href = '/pages/transactions/'

  // wallets
  walletsIcon.src = '/public/icons/wallets-icon.svg'
  walletsIcon.alt = 'wallets'
  walletsTitle.innerHTML = 'Wallets'
  walletsLink.href = '/pages/wallets/'

  // convert
  convertIcon.src = '/public/icons/convert-icon.svg'
  convertIcon.alt = 'convert'
  convertTitle.innerHTML = 'Exchange'
  convertLink.href = '/pages/convertation/'

  // market
  marketIcon.src = '/public/icons/market-icon.svg'
  marketIcon.alt = 'market'
  marketTitle.innerHTML = 'Market'


  line.classList.add('line')

  account.classList.add('account')
  avatar.classList.add('avatar')
  userName.classList.add('user_name')

  logOut.classList.add('log_out')
  logOutTitle.href = '/pages/signin/'

  userName.innerHTML = 'james fonik'
  logOutIcon.src = '/public/icons/log-out-icon.svg'
  logOutIcon.alt = 'log out'
  logOutTitle.innerHTML = 'Log Out'



  wrapper.prepend(sidebar)
  sidebar.append(top_sidebar, bottom_sidebar)

  top_sidebar.append(logo, pagesList)

  pagesList.append(mainLink, walletsLink, tranLink, convertLink, marketLink)

  mainLink.append(mainBlock)
  walletsLink.append(walletsBlock)
  tranLink.append(tranBlock)
  convertLink.append(convertBlock)
  marketLink.append(marketBlock)

  mainBlock.append(mainIcon, mainTitle)
  walletsBlock.append(walletsIcon, walletsTitle)
  tranBlock.append(tranIcon, tranTitle)
  convertBlock.append(convertIcon, convertTitle)
  marketBlock.append(marketIcon, marketTitle)

  bottom_sidebar.append(line, account, logOut)
  account.append(avatar, userName)
  logOut.append(logOutIcon, logOutTitle)

  let pages = {
    "/": mainLink,
    "wallets": walletsLink,
    "transactions": tranLink,
    "convertation": convertLink
}

let page = location.pathname.split('/')[2]
page = page ? page : "/"
console.log(pages[page]);

if (pages[page]) {
    pages[page].classList.add('active_page')
} else {
    pages.wallets.classList.add('active_page')
}
}

export function header() {
  let header = document.createElement('header')
  let search_input_box = document.createElement('div')
  let search_input = document.createElement('input')
  let search_input_icon = document.createElement('img')
  let header_tools = document.createElement('div')
  let massages = document.createElement('img')
  let notifications = document.createElement('img')

  header.classList.add('header')
  search_input_box.classList.add('search_input')
  search_input.id = 'search_input'
  search_input.type = 'text'

  header_tools.classList.add('header_tools')

  search_input_icon.src = '/public/icons/search-icon.svg'
  search_input_icon.alt = 'search'

  massages.src = '/public/icons/massages-icon.svg'
  massages.alt = 'massages'
  notifications.src = '/public/icons/notifications-icon.svg'
  notifications.alt = 'notifications'

  wrap.prepend(header)
  header.append(search_input_box, header_tools)
  search_input_box.append(search_input, search_input_icon)
  header_tools.append(massages, notifications)
}

export function balanceDoughnut(place, numbers, labels, colours) {

  const data = {
    datasets: [{
      label: "Wallet",
      data: numbers,
      backgroundColor: colours,
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      borderWidth: 0,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        }, 
        datalabels: {
          display: false
        }
      }
    },
  };


  new Chart(place, config)
}

export function getRandomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);

  return {
    transperent: `rgba(${r}, ${g}, ${b}, 0.5)`,
    full: `rgb(${r}, ${g}, ${b})`
  }
}

export function reloadCardsGrid(arr, place) {
  place.innerHTML = ''

  for (let item of arr) {

    let wallet = document.createElement('div')
    wallet.classList.add('wallets_item')
    wallet.style.background = `linear-gradient(237.07deg, ${item.color.transperent} -8.06%, #0F0B38 96.63%)`
    wallet.innerHTML += `

    <h2 class="wallet_name">${item.name}</h2>
    <h3 class="wallet_min_balance">${item.balance.toLocaleString('ru')} ${item.currency}</h3>

    <div class="wallet_stonks">

      <div class="stonks_item">
        <img src="./public/icons/stonks.svg" alt="stonks">
        <h3>$1 200 = 0,034 btc</h3>
      </div>

      <div class="stonks_item">
        <img src="./public/icons/regress.svg" alt="stonks">
        <h3>$1 200 = 0,034 btc</h3>
      </div>

      <div class="stonks_item">
        <img src="./public/icons/regress.svg" alt="stonks">
        <h3>$1 200 = 0,034 btc</h3>
      </div>
  </div>
    `

    place.append(wallet)
  }
}

export function reloadCardTransactions(arr, place) {
  place.innerHTML = ''

  for (let item of arr) {
    place.innerHTML += `
    <div class="transaction">
        <div class="tran_info">
            <h4 class="tran_time">${moment(item.created_at, "YYYYMMDD, h:mm").fromNow()}</h4>
            <img src="/public/icons/${item.type === 'send' ? 'red-arrow-left.png' : 'green-arrow-right.png'}" alt="">
            <h3 class="recive_send">${item.type === 'send' ? 'Sent' : 'Received'} ${item.wallet.currency}</h3>
        </div>

        <h3 class="tran_total">${item.type === 'send' ? '-' : '+'} ${item.total}</h3>
    </div>`
  }
}


export function reloadTransactions(arr, place) {
  place.innerHTML = ''

  for (let item of arr) {
    let dateMin = item.created_at.split(',').at(0)
    const date = `${dateMin.slice(0, 4)}-${dateMin.slice(4, 6)}-${dateMin.slice(6)}`
    place.innerHTML += `
    <div class="transaction">
        <div class="tran_left">
            <h3 class="tran_time">${item.created_at.split(', ').at(-1)}</h3>
            <h3 class="tran_date">${date}</h3>
            <h3 class="tran_wallet">${item.wallet.name}</h3>
            <img class="tran_rec_send" src="/public/icons/${item.type === 'send' ? 'red-arrow-left.png' : 'green-arrow-right.png'}" alt="">
            <h3 class="tran_id">${item.id}</h3>
        </div>

        <div class="tran_right">
            <h3 class="tran_total">${item.total.toLocaleString('ru')} ${item.wallet.currency}</h3>
            <div class="tran_status_box tran_status_${item.status}">
                <h3 class="tran_status">${item.status}</h3>
            </div>
        </div>
    </div>`
  }
}

export function reloadWallets(arr, place) {
  place.innerHTML = ''

  for (let item of arr) {
    let wallet = document.createElement('div')
    let walletInfo = document.createElement('div')
    let walletName = document.createElement('h3')
    let walletBalanceBox = document.createElement('div')
    let walletBalance = document.createElement('h2')
    let walletColor = document.createElement('div')
    let walletPulse = document.createElement('img')

    wallet.classList.add('wallet')
    walletInfo.classList.add('wallet_info')
    walletName.classList.add('wallet_name')
    walletBalanceBox.classList.add('wallet_balance_box')
    walletBalance.classList.add('balance')
    walletColor.classList.add('wallet_color')

    wallet.style.background = `linear-gradient(237.07deg, ${item.color.transperent} -8.06%, rgba(15, 11, 56, 0.5) 96.63%)`
    walletName.innerHTML = item.name
    walletBalance.innerHTML = item.balance.toLocaleString('ru') + ' ' + item.currency
    walletColor.style.backgroundColor = item.color.full
    walletPulse.src = '/public/icons/pulse.svg'
    walletPulse.alt = 'pulse'

    place.append(wallet)
    wallet.append(walletInfo, walletPulse)
    walletInfo.append(walletName, walletBalanceBox)
    walletBalanceBox.append(walletBalance, walletColor)

    wallet.onclick = () => {
      location.assign('/pages/wallets/?id=' + item.id)
    }
  }

}

export function reloadPercent(place, arr, procents) {
  place.innerHTML = ''

  for(let item of arr) {
    let idx = arr.indexOf(item)

    place.innerHTML += `
    <div class="currency_item">
        <div class="currency_title">
            <div class="currency_color" style="background-color: ${item.color.full}; box-shadow: 0px 4px 4px 0px ${item.color.transperent}"></div>
            <p class="currency_name">${item.name}</p>
        </div>

        <h4 class="currency_percent">${procents[idx]} %</h4>
    </div>`
  }
}
