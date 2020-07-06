'use strict';
const path = require('path');
module.exports = {
  // 模式，2种：生产模式(production)和开发模式(development)
  // 开发模式不压缩打包后代码，生产模式压缩打包后代码
  mode: 'production',
  // mode: 'development',
  // 1、source-map：产生文件，产生行列
  // devtool: 'source-map',
  entry: path.join(__dirname, '../src/mapgrid.js'),
  target: 'node',
  externals: {
    canvas: 'canvas',
    jsdom: 'jsdom',
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  output: {
    library: 'MapGrid',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    filename: 'mapgrid.js',
  },
};
