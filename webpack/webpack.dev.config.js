'use strict';
const path = require('path');
module.exports = {
  devServer: {
    // 端口，默认8080
    port: '8099',
    // 进度条
    progress: true,
    // 启动后访问目录，默认是项目根目录，这个设置到打包后目录
    contentBase: 'test',
    // 启动压缩
    // compress: true
  },
  // 模式，2种：生产模式(production)和开发模式(development)
  // 开发模式不压缩打包后代码，生产模式压缩打包后代码
  // mode: 'production',
  mode: 'development',
  // 1、source-map：产生文件，产生行列
  devtool: 'source-map',
  target: 'web',
  externals: {
    canvas: 'canvas',
    jsdom: 'jsdom',
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  entry: path.join(__dirname, '../src/mapgrid.js'),
  output: {
    library: 'MapGrid',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../test'),
    filename: 'mapgrid.js',
  },
};
