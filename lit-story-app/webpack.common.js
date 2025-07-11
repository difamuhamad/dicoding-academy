const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views/index.html'),
      favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Add',
      filename: 'add-page.html',
      template: path.resolve(__dirname, 'src/views/add-page.html'),
      favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Profile',
      filename: 'profile-page.html',
      template: path.resolve(__dirname, 'src/views/profile-page.html'),
      favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
      ...htmlWebpackPluginConfig,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
