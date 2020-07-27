const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/index.tsx")
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/',
    filename: '[name].[hash].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devServer: {
    contentBase: './build',
    compress: true
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, "src"),
        exclude: '/node_modules/',
        use: [
          { loader: "babel-loader" },
          { loader: "ts-loader", options: { transpileOnly: true } }
        ]
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',            
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlWepackPlugin({      
      template: path.resolve('./index.html')
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: false }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,          
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  }
}