const miniCss = require('mini-css-extract-plugin');
const htmlPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry:{
        common:[
            'react',
            'react-dom',
            'moment',
            'jquery',            
        ],        
        app: path.resolve(__dirname,'src-static/js/app.js'),
        inscription: path.resolve(__dirname,'src-static/js/inscription.js'),
        fds: path.resolve(__dirname,'src-static/js/fds-list.js'),
        login: path.resolve(__dirname,'src-static/js/login.js'),
        inscriptionsList: path.resolve(__dirname,'src-static/js/react-components/pages/inscriptions-list/index.jsx'),
        inscriptionDetail: path.resolve(__dirname,'src-static/js/react-components/pages/inscriptionDetail/index.jsx'),
        formNewEmptyFounder: path.resolve(__dirname,'src-static/js/react-components/pages/register/registerFounders/index.jsx')
    },
    output:{
        path:path.resolve(__dirname,'static'),
        filename:'js/[name].js',
        publicPath: './static/'
    },
    module:{
        rules:[
            {
                test:/\.css$/, 
                exclude: /node_modules/,
                use:[
                    miniCss.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            { 
                test: /\.jsx?$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                query: {
                    presets: ['env', 'react'],
                }
            },
            {
                test: /\.(ttf|eot|woff(2)|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 1000, // Convert images < 1kb to base64 strings
                        name: 'fonts/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 1000, // Convert images < 1kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]

    },
    optimization:{
        splitChunks: {
            name: "common",
            chunks: "initial"
        }
    },
    plugins: [
        new miniCss({filename:'css/app.bundle.css'}),
        new htmlPlugin(),

        
    ],
    target: 'web',

}