const path = require('path');

module.exports = {
  entry: './index.tsx',
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
    filename: 'options.bundle.js',
    path: path.resolve(__dirname, '../../../bundle/src'),
  },
  devtool: 'cheap-module-source-map',
};
