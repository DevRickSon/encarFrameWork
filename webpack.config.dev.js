const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBrowserPlugin = require('webpack-browser-plugin');

let entries = {};
let dirnames = {};
let entryArr = glob.sync('./src/js/page/*/**.js');

entryArr.forEach(function(item, i){
    let entry = entryArr[i];
    let dirname = path.dirname(item);
    let name = path.basename(item, '.js');
    let key = dirname.replace(/\.\/src\/js\/page\/(.*)/, '$1');

    entries[key + '/' + name] = item;
    dirnames[key + '/' + name] = key;
});

let plugins = [
    new ExtractTextPlugin({
        filename: function(getPath){
            var arr = getPath('css/[name].css').split('/'),
                len = arr.length;

            return 'css/' + arr[len-1];
        }
    }),

    new webpack.HotModuleReplacementPlugin(),

    new WebpackBrowserPlugin({
        port: 8081,
        url: 'http://10.19.1.83'
    })
];

for(let key in entries){
    plugins.push(
        new HtmlWebpackPlugin({
            template: './src/html/' + key + '.html',
            filename: 'html/' + key + '.html',
            inject: 'body',
            chunks: [key]
        })
    );
}

module.exports = {
    entry: entries,

    output: {
        path: path.join(__dirname, '/public'),
        publicPath: '/',
        filename: 'js/[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },

            {
                test: /\.handlebars$/,
                use: 'handlebars-loader'
            }
        ]
    },

    plugins: plugins,

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8081,
        inline: true,
        hot: true,
        host: '10.19.1.83',
        proxy: {
            '/api': 'http://api.encar.com/search/car/list/general'
        },
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunksModules: false
        }
    },

    resolve: {
        extensions: ['.js'],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],

        alias: {
            'handlebars': 'handlebars/dist/handlebars.min'
        }
    },

    devtool: 'cheap-eval-source-map'
};
