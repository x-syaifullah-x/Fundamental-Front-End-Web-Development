const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/app.js",
    resolve: {
        alias: {"src": path.resolve(__dirname, '../src')},
    },

    output: {
        // path: path.resolve(__dirname, "../dist"),
        path: path.resolve(__dirname, "/var/www/html"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
        ]
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "",
            filename: "index.html"
        }),

        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            'jQuery': 'jquery',
            '$': 'jquery'
        })
    ],

    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
};