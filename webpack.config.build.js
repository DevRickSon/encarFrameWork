const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    new CleanWebpackPlugin([
        './public/html/*',
        './public/css/*',
        './public/js/*'
    ]),

    new ExtractTextPlugin({
        filename: function(getPath){
            var arr = getPath('css/[name].css').split('/'),
                len = arr.length;

            return 'css/' + arr[len-1];
        }
    }),

    new webpack.optimize.UglifyJsPlugin({
        mangle: {
            // mangle options, if any
        },
        mangleProperties: {
            screw_ie8: false,
            //ignore_quoted: true,      // do not mangle quoted properties and object keys
        },
        compress: {
            screw_ie8: false,
            warnings: false,
            unused: true
            //properties: false // optional: don't convert foo["bar"] to foo.bar
        },
        output: {
            screw_ie8: false,
            comments: false
        }
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
        path: path.join(__dirname, 'public'),
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

    //devtool: 'cheap-eval-source-map'
};
