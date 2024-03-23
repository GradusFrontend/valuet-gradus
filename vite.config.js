import {
    resolve
} from 'path'
import {
    defineConfig
} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                wallets: resolve(__dirname, 'pages/wallets/index.html'),
                transactions: resolve(__dirname, 'pages/transactions/index.html'),
                signin: resolve(__dirname, 'pages/signin/index.html'),
                signup: resolve(__dirname, 'pages/signup/index.html'),
                convertation: resolve(__dirname, 'pages/convertation/index.html'),
            },
        },
    },
})