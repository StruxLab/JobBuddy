const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../../bundle/contentscripts'),
    filename: 'linkedin.bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'ts-loader',
        // use: {
        //   loader: 'ts-loader',
        //   options: {
        //     presets: ['@babel/preset-react'],
        //   },
        // },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'cheap-module-source-map',
};
