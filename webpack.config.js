const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

plugins = [
    // Serve para gerar o arquivo HTML, neste caso está utilizando um template
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
    }),
    // Serve para retirar o css que é inserido no arquivo bundle.js por padrão e inseri-lo no arquivo style.css
    new ExtractTextPlugin('style.css')
];

if(process.env.NODE_ENV === 'production'){
    // Define o ambiente de desenvolvimento do webpack como produção
    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }));
    // Ativa o plugin de minificação
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}


module.exports = {
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /.jsx/,
                exclude: /node_modules/,
                // Pasta com os arquivos fonte
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            // Configuração do file-loader para webpack
            {
                test: /\.(jpe?g|ico|png|gif|svg)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            // Configuração para css-loader e style-loader
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./dist"
    },
    plugins: plugins
};