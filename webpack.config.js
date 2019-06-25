const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
  // entry: {
  //   app: [
  //     'react-hot-loader/patch',
  //     './app/index.js'
  //   ],
  //   vendor: ['react', 'react-dom', 'axios', 'redux', 'redux-thunk', 'prop-types']
  // },
  entry: [
    // 'react-hot-loader/patch',
    './app/index.tsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      // { test: /\.module\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.module\.css$/, use: ['style-loader', 'css-loader'] },
      {// Use the MiniCssExtractPlugin to extract css file
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
      { test: /\.(png|jpg|gif)$/, use: [{ loader: 'url-loader', options: { limit: 8192 } }] },
    ],
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  devServer: {
    historyApiFallback: true,
    hot: true,
    https: true,
  },
  optimization: {
    splitChunks: {
      name: false,
    },
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'app/index.html' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new webpack.optimize.CommonsChunkPlugin({  Deprecated
    //   name: 'vendor', // Specify the common bundle's name.
    //   minChunks: Infinity
    // }),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/
      { from: 'app/pwa' },
    ]),
    new InjectManifest({
      swSrc: './app/service-worker.js',
      swDest: './service-worker.js',
    }),
    // new BundleAnalyzerPlugin(), // Analyze the bundle file.
  ],
};

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
  delete config.resolve.alias; // Remove the react hot loader dom
  delete config.devtool; // Remove the source map

  // config.module.rules[1] = ({ // In production model, replace the css rules in order to use ExtractTextPlugin. My css rules is in the position 2.
  //   test: /\.css$/,
  //   use: [
  //     {
  //       loader: MiniCssExtractPlugin.loader,
  //       options: {
  //         // you can specify a publicPath here
  //         // by default it uses publicPath in webpackOptions.output
  //         publicPath: '../',
  //         hmr: process.env.NODE_ENV === 'development',
  //       },
  //     },
  //     'css-loader',
  //   ],
  // });


  // config.module.rules[1] = ({
  //   test: /\.css$/,
  //   use: [
  //     MiniCssExtractPlugin.loader,
  //     {
  //       loader: 'css-loader',
  //       options: {
  //         importLoaders: 1,
  //         sourceMap: true,
  //         modules: true,
  //         // localIdentName: '[local]___[hash:base64:5]',
  //         minimize: {
  //           safe: true,
  //         },
  //       },
  //     },
  //   ],
  //   exclude: /\.global\.css$/,
  // });

  config.mode = 'production';
  // config.devtool = 'source-map';
  // config.plugins.push(
  //   // new webpack.DefinePlugin({
  //   //   'process.env': {
  //   //     NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  //   //   }
  //   // }),
  //   // new ExtractTextPlugin({ filename: '[name].css', allChunks: true }), // Extract css to one file.
  //   new MiniCssExtractPlugin({
  //     filename: '[name].css',
  //   }),
  // new UglifyJsPlugin({
  //   uglifyOptions: {
  //     compress: {
  //       // remove warnings
  //       // warnings: false,
  //       sequences: true, // Join consecutive simple statements using the comma operator
  //       dead_code: true,
  //       conditionals: true, // Apply optimizations for if-s and conditional expressions.
  //       booleans: true,
  //       unused: true, // Drop unreferenced functions and variables.
  //       if_return: true,
  //       join_vars: true,
  //       drop_console: true,
  //     },
  //   },
  // }),
  // );
  // config.optimization = {
  //   minimizer: [new UglifyJsPlugin()],
  // };
}

module.exports = config;
