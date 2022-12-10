const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: 'url-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.html'],
  },
  output: {
    filename: 'bundle.js',
    path: buildPath,
  },
  performance: {
    // Website performance is not the priority as of right now.
    // These settings can be changed later.
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{
        from: 'src/assets',
        to: buildPath
      }]
    })
  ],
  devServer: {
    static: {
      directory: buildPath,
    },
    compress: true,
    port: 9000,
  }
};
