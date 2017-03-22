/**
 * `webpack.config.js`
 * --------------------------
 * config file for webpack module bundler
 */

module.exports = {
   entry: './assets/app/main.js',
   output: { path:'./.tmp/public/app', filename: 'bundle.js'},
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}