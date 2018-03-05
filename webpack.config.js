const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
module.exports = {
    entry:"./src-static/js/app.js",
    output:{
        path:path.resolve(__dirname,'static'),
        filename:'js/app.bundle.js',
        publicPath: './static/'
    },
    module:{
        rules:[
            {
                test:/\.css$/, 
                exclude: /node_modules/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        'resolve-url-loader',
                        'postcss-loader',
                    ]

                })
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
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
                        limit: 10000, // Convert images < 8kb to base64 strings
                        name: 'fonts/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 10000, // Convert images < 10kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]

    },
    target: 'web',
    plugins: [
    new ExtractTextPlugin('css/app.bundle.css'),
  ]

}