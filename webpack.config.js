const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  mode: 'production',
  entry: './src/index.js',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve(__dirname, './dist'),
    // 出力ファイル名
    filename: 'main.js',
  },
  devtool: "source-map",
  module: {
    rules: [{
      // 拡張子 .js の場合
      test: /\.js$/,
      use: [{
        // Babel を利用する
        loader: "babel-loader",
        // Babel のオプションを指定する
        options: {
          presets: [
            // プリセットを指定することで、ES2020 を ES5 に変換
            "@babel/preset-env",
          ]
        }
      }]
    },
    {
      // 拡張子 .cssの場合
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          url: false,
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  // ES5(IE11等)向けの指定
  target: ['web', 'es5'],
};