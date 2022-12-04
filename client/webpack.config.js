const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const InterpolateHtmlPlugin = require("interpolate-html-plugin")
const WebpackPwaManifest = require("webpack-pwa-manifest")



module.exports = {
  entry: './src/index.js',
    mode:'development',
  output: {
    path: path.join(__dirname, "build"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  resolve: {
    extensions: ['.js', '.jsx','.css','.json'],
    modules:['node_modules'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    } 
},
  plugins: [
    new webpack.ProvidePlugin({
      process:'process/browser'
    }),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject:true,
      alwaysWriteToDisk:true, 
      favicon:"public/favicon.ico",
      manifest:"public/manifest.json"

      // to import index.html file inside index.js
    }),
   new WebpackPwaManifest()

  ],
  devServer: {
    port: 8080,
    static:{
      directory:path.join(__dirname,"build")
    },
    hot:true,
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.m?js/,
            resolve: {
               fullySpecified: false
            }
           },
        {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
        },
    ],
  },
};