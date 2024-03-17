import { Chart } from "chart.js"

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
    let logOutTitle = document.createElement('h3')

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

    // wallets
    walletsIcon.src = '/public/icons/wallets-icon.svg'
    walletsIcon.alt = 'wallets'
    walletsTitle.innerHTML = 'Wallets'
    walletsLink.href = '/pages/wallets/'
    
    // convert
    convertIcon.src = '/public/icons/convert-icon.svg'
    convertIcon.alt = 'convert'
    convertTitle.innerHTML = 'Exchange'

    // market
    marketIcon.src = '/public/icons/market-icon.svg'
    marketIcon.alt = 'market'
    marketTitle.innerHTML = 'Market'


    line.classList.add('line')

    account.classList.add('account')
    avatar.classList.add('avatar')
    userName.classList.add('user_name')

    logOut.classList.add('log_out')

    userName.innerHTML = 'james fonik'
    logOutIcon.src = '/public/icons/log-out-icon.svg'
    logOutIcon.alt = 'log out'
    logOutTitle.innerHTML = 'Log Out'
    
    

    wrapper.prepend(sidebar)
    sidebar.append(top_sidebar, bottom_sidebar)

    top_sidebar.append(logo, pagesList)

    pagesList.append( mainLink, walletsLink, tranLink, convertLink, marketLink)

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

export function balanceDoughnut (place) {

    const data = {
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100, 140],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#d595d5'
          ],
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
            }
          }
        },
      };


      new Chart(place, config)
}

export function getRandomColor(opacity) {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);

    if(opacity === '1') {
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        return `rgb(${r}, ${g}, ${b}, ${opacity})`;
    }
}