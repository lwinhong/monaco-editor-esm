/*eslint-env node */

const path = require("path")
const postcssPresetEnv = require("postcss-preset-env")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
//const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    const prod = Boolean(env && env.production)
    const mode = prod ? "production" : "development"
    const browserlist = [">1%", "not dead", "not ie 11"]

    return {
        mode,
        target: "web",
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "index.js",
            // libraryTarget: "var",
            // library: "vdk",
        },
        // node: {
        //     fs: "empty"
        // },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: 'vue-loader',
                            options: {

                            }
                        },
                        {
                            loader: 'iview-loader',
                            options: {
                                prefix: false
                            }
                        }
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules[\\/](?!vue-eslint-editor)/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                babelrc: false,
                                cacheDirectory: true,
                                plugins: [
                                    "@babel/plugin-syntax-dynamic-import",
                                    [
                                        "@babel/plugin-transform-runtime",
                                        { useESModules: true },
                                    ],
                                ],
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            modules: false,
                                            targets: browserlist,
                                            useBuiltIns: "entry",
                                        },
                                    ],
                                ],
                            },
                        },
                    ],
                },
                {
                    //test: /\.(less|css)$/,
                    test: /\.css$/,
                    use: [
                        {
                            loader: "vue-style-loader",
                            options: {},
                        },
                        {
                            loader: "css-loader",
                            options: {},
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    postcssPresetEnv({
                                        browsers: browserlist,
                                        stage: 3,
                                    }),
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ijmap|ttf|woff|woff2?)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
                // `vue-eslint-parser` has `require(parserOptions.parser || "espree")`.
                // Modify it by a static importing.
                {
                    test: /node_modules[/\\]vue-eslint-parser[/\\]index\.js$/,
                    use: [
                        {
                            loader: "string-replace-loader",
                            options: {
                                search:
                                    'typeof parserOptions.parser === "string"\n        ? require(parserOptions.parser)\n        : require("espree")',
                                replace:
                                    '(parserOptions.parser === "babel-eslint" ? require("babel-eslint") : require("espree"))',
                            },
                        },
                    ],
                },
                // Patch for `babel-eslint` -- accessing `global` causes build error.
                {
                    test: /node_modules[/\\]babel-eslint[/\\]lib[/\\]analyze-scope\.js$/,
                    use: [
                        {
                            loader: "string-replace-loader",
                            options: {
                                search: 'require("./patch-eslint-scope")',
                                replace: "Object",
                            },
                        },
                    ],
                },
                // Patch for `eslint-utils` -- accessing `global` causes build error.
                {
                    test: /node_modules[/\\]eslint-utils[/\\]index\.m?js$/,
                    use: [
                        {
                            loader: "string-replace-loader",
                            options: {
                                search: "\\bin global\\b",
                                replace: "in window",
                                flags: "g",
                            },
                        },
                        {
                            loader: "string-replace-loader",
                            options: {
                                search: "\\bglobal\\[",
                                replace: "window[",
                                flags: "g",
                            },
                        },
                    ],
                }
            ]
        },
        resolve: {
            alias: {
                vue$: "vue/dist/vue.esm.js",
            },
            extensions: [".mjs", ".js", ".vue", ".json"],
        },
        plugins: [
            //, new MonacoWebpackPlugin()
            new CopyWebpackPlugin([{
                from: './src/resource',
                to: 'resource',
            },
            {
                from: './src/monaco-editor/vs',
                to: 'resource/monaco-editor/vs',
            },
            // {
            //     from: './node_modules/monaco-editor/dev/vs',
            //     to: 'resource/monaco-editor/vs',
            // },
            {
                from:'./node_modules/iview/dist/styles',
                to: 'resource/styles'
            },{
                from:'./node_modules/jquery/dist/jquery.min.js',
                to: 'resource'
            }]),
            new VueLoaderPlugin(),
        ],
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
        },
        performance: {
            hints: false,
        },
        devtool: false

    }
}
