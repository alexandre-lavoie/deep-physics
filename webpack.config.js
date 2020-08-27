const path = require('path');
module.exports = {
   entry: path.resolve(__dirname, "./src/index.ts"),
   output: {
       filename: "bundle.js",
       path: path.resolve(__dirname, 'build')
   },
   resolve: {
       extensions: [".webpack.js", ".web.js", ".ts", ".js"]
   },
   module: {
       rules: [{ test: /\.ts$/, loader: "ts-loader" }]
   }
}