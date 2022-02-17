const path = require('path');

module.exports = {
  entry: './index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    filename: 'linkedin.bundle.js',
    path: path.resolve(__dirname, '../../bundle/contentscripts'),
  },
  devtool: 'cheap-module-source-map',
};
