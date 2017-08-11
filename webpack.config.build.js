const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SpritesmithPlugin = require('webpack-spritesmith');

let entries = {
    vendor: [
        'jquery',
        'handlebars',
        'sammy'
    ]
};
let dirnames = {};
let entryArr = glob.sync('./src/js/page/*/**.js');

let sprArr = [];
let entryArrSpr = glob.sync('./src/images/spr/*');

entryArr.forEach(function(item, i){
    let entry = entryArr[i];
    let dirname = path.dirname(item);
    let name = path.basename(item, '.js');
    let key = dirname.replace(/\.\/src\/js\/page\/(.*)/, '$1');

    entries[key + '/' + name] = item;
    dirnames[key + '/' + name] = key;
});

entryArrSpr.forEach(function(item, i){
    let arr = item.split('/');
    let leng = arr.length;
    let key = arr[leng-1];

    sprArr[i] = key
});

let plugins = [
    new CleanWebpackPlugin([
        './public/html/*',
        './public/css/*',
        './public/js/*'
    ]),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
    }),

    new ExtractTextPlugin({
        filename: function(getPath){
            var arr = getPath('css/[name].scss').split('/'),
                len = arr.length;

            return 'css/' + arr[len-1].split('.')[0] + '.css';
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
    if(key === 'vendor') continue;

    plugins.push(
        new HtmlWebpackPlugin({
            template: './src/html/' + key + '.html',
            filename: 'html/' + key + '.html',
            inject: 'body',
            chunks: ['vendor', key],
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
        })
    );
}

for(let i=0; i<sprArr.length; i++){
    let loc = sprArr[i];

    plugins.push(
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/images/spr/' + loc),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'public/images/spr/' + loc + '.png'),
                css: path.resolve(__dirname, 'src/css/spr/' + loc + '.scss')
            },
            apiOptions: {
                cssImageRef: '/images/spr/' + loc + '.png'
            }
        })
    );
}

module.exports = {
    entry: entries,

    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.handlebars$/,
                use: 'handlebars-loader'
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    Object.assign(
                        {
                            fallback: require.resolve('style-loader'),
                            use: [
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 1,
                                        minimize: true,
                                        sourceMap: true
                                        //modules: true,
                                        //localIdentName: '[path][name]__[local]--[hash:base64:5]'
                                    },
                                },
                                // {
                                //     loader: require.resolve('postcss-loader'),
                                //     options: {
                                //         // Necessary for external CSS imports to work
                                //         // https://github.com/facebookincubator/create-react-app/issues/2677
                                //         ident: 'postcss',
                                //         plugins: () => [
                                //             require('postcss-flexbugs-fixes'),
                                //             autoprefixer({
                                //                 browsers: [
                                //                     '>1%',
                                //                     'last 4 versions',
                                //                     'Firefox ESR',
                                //                     'not ie < 9', // React doesn't support IE8 anyway
                                //                 ],
                                //                 flexbox: 'no-2009',
                                //             }),
                                //         ]
                                //     }
                                // },
                                {
                                    loader: require.resolve('sass-loader'),
                                    options: {
                                        //includePaths: [paths.styles]
                                    }
                                }
                            ]
                        }
                    )
                )
            },

            {
                test: /\.png$/,
                use: 'file-loader?name=i/[hash].[ext]'
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
            'jquery': 'jquery/dist/jquery.min',
            'handlebars': 'handlebars/dist/handlebars.min',
            'sammy': 'sammy/lib/min/sammy-latest.min'
        }
    },

    //devtool: 'cheap-eval-source-map'
};
