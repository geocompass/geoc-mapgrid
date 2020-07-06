'use strict';
const gridLine = require('./grid-line');
const gridText = require('./grid-text');
const BaseUtil = require('./base-util');
/**
 * 地图格网
 */
class MapGrid extends BaseUtil {
  /**
     * 生成地图格网
     * @param {context2d} ctx canvas的context2d
     * @param {Array} box 地图范围 [117, 39, 118, 41]
     * @param {Number} canvasWidth 画布宽
     * @param {Number} canvasHeight 画布高
     * @param {Object} [options] 配置项
     * @param {Number} [options.gridColumns = 5] 格网列数
     * @param {Number} [options.gridRows = 5] 格网行数
     * @param {Number} [options.dpi = 96] dpi
     * @param {Boolean} [options.showGrid = true] 是否显示格网
     * @param {Boolean} [options.showText = true] 是否显示经纬度标注
     *
     */
  constructor(ctx, box, canvasWidth, canvasHeight, {
    gridColumns = 5,
    gridRows = 5,
    dpi = 96,
    showGrid = true,
    showText = true,
  } = {

  }) {
    super();
    this.box = box;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    if (!ctx) {
      this._initCtx();
    } else {
      this.ctx = ctx;
    }
    this.gridColumns = gridColumns;
    this.gridRows = gridRows;
    this.showGrid = showGrid;
    this.showText = showText;
    this.dpi = dpi;
    if (gridColumns === 0 && gridRows === 0) {
      const xx = this.box[2] - this.box[0];
      const yy = this.box[3] - this.box[1];
      console.log(`区域纬度跨度${yy}，经度跨度${xx}，没有格网线！`);
      return;
    }
    this.gridLinePadding = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    this._initLayer();
    this._drawGridText();
    this._drawGridLine();
    this._render();
  }
  /**
   * 获取绘图的canvas，只有创建时的ctx为null才有值
   */
  getCanvas() {
    return this.canvas;
  }
  /**
   * 设置格网的行列数
   * @param {Number} rows 行数
   * @param {Number} columns 列数
   */
  setGridRC(rows, columns) {
    this.gridColumns = columns;
    this.gridRows = rows;
    this.clearAll();
    this._drawGridText();
    this._drawGridLine();
    this._render();
  }
  /**
   * 清除显示图层
   */
  clearAll() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  /**
   * 清除所有图层
   */
  release() {
    this.clearAll();
    this.canvas = null;
    this.gridLineLayer.ctx.clearRect(0, 0, this.gridLineLayer.width, this.gridLineLayer.height);
    this.gridLineLayer.canvas = null;
    this.gridLineLayer = null;
    this.gridTextLayer.ctx.clearRect(0, 0, this.gridLineLayer.width, this.gridLineLayer.height);
    this.gridTextLayer.canvas = null;
    this.gridTextLayer = null;
  }
  _initCtx() {
    this.canvas = this.document.createElement('canvas');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx = this.canvas.getContext('2d');
  }
  _initLayer() {
    // 网格线图层
    const gridLineCanvas = this.document.createElement('canvas');
    gridLineCanvas.width = this.canvasWidth;
    gridLineCanvas.height = this.canvasHeight;
    this.gridLineLayer = {
      canvas: gridLineCanvas,
      width: this.canvasWidth,
      height: this.canvasHeight,
      ctx: gridLineCanvas.getContext('2d'),
    };
    // 网格文字图层
    const gridTextCanvas = this.document.createElement('canvas');
    gridTextCanvas.width = this.canvasWidth;
    gridTextCanvas.height = this.canvasHeight;
    this.gridTextLayer = {
      canvas: gridTextCanvas,
      width: this.canvasWidth,
      height: this.canvasHeight,
      ctx: gridTextCanvas.getContext('2d'),
    };

  }

  _render() {
    if (this.showText) this._addGridTextToCanvas();
    if (this.showGrid) this._addGridLineToCanvas();
  }
  // 格网相关
  removeGridLine() {
    return gridLine.removeGridLine.call(this);
  }
  _addGridLineToCanvas() {
    return gridLine._addGridLineToCanvas.call(this);
  }
  _drawGridLine() {
    return gridLine.drawGridLine.call(this);
  }
  // 文字相关
  _addGridTextToCanvas() {
    return gridText._addGridTextToCanvas.call(this);
  }
  _drawGridText() {
    return gridText._drawGridText.call(this);
  }
}
module.exports = MapGrid;
