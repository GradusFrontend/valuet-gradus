import { header, sidebar, toaster, getRandomColor, reloadTransactions } from '../../modules/ui'
import Chart from 'chart.js/auto'
import { balanceDoughnut } from '../../modules/ui';
import moment from 'moment/moment';

sidebar()
header()

const transactionsWrap = document.querySelector('#transactions')

reloadTransactions([{
    id: 'j3j42jj23',
    total: 32342,
    status: 'completed',
    created_at: moment().format("YYYYMMDD, HH:m"),
    type: 'recive',
    wallet: {
        name: 'gradus visa',
        currency: 'AED',
    }
}], transactionsWrap)