'use strict'
const path = require('path')

module.exports = {
    dev: {
        env: "development",
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // '/api/*': {
            //     target: 'https://xxx.xxx.cn',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': '/api'
            //     }
            // },
            // '/kdata': {
            //     target: 'https://xxx.yyy.cn:4062',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/data': '/data'
            //     }
            // }
        },
        host: 'localhost',
        port: 8099,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        devtool: 'cheap-module-eval-source-map',//inline-source-map'
        cacheBusting: true,
        cssSourceMap: false
    },

    build: {
        env: "product",
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: [
            'js', 'css'
        ],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
