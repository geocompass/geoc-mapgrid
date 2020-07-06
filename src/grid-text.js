'use strict';
const degreeUtil = require('./util/degree');
const textUtil = require('./util/text');
const transformUtil = require('./util/transform');
const BASEDPI = 96;
module.exports = {
  _addGridTextToCanvas() {
    this.ctx.drawImage(this.gridTextLayer.canvas, 0, 0, this.gridTextLayer.width, this.gridTextLayer.height, 0, 0, this.canvasWidth, this.canvasHeight);
  },
  _drawGridText() {
    const layerCtx = this.gridTextLayer.ctx;
    layerCtx.clearRect(0, 0, this.gridTextLayer.width, this.gridTextLayer.height);
    const x_num = this.gridColumns;
    const y_num = this.gridRows;
    const box = this.box;
    if (x_num > 30 || y_num > 30) {
      console.log('大于30个');
    }
    if (x_num === 0 && y_num === 0) {
      const xx = box[2] - box[0];
      const yy = box[3] - box[1];
      console.log(`区域纬度跨度${yy}，经度跨度${xx}，没有格网线！`);
      return;
    }
    // const stepX = Math.ceil(((box[2] - box[0]) / x_num) * 100) / 100;
    const mercatorBox = [ ...transformUtil.lonLat2Mercator([ box[0], box[1] ]), ...transformUtil.lonLat2Mercator([ box[2], box[3] ]) ];
    const stepX = Math.ceil((mercatorBox[2] - mercatorBox[0]) / x_num);
    const stepWidth = Math.ceil(this.canvasWidth / x_num);
    // const stepY = Math.ceil(((box[3] - box[1]) / y_num) * 100) / 100;
    const stepY = Math.ceil((mercatorBox[3] - mercatorBox[1]) / y_num);
    const stepHeight = Math.ceil(this.canvasHeight / y_num);
    layerCtx.globalAlpha = 1;
    layerCtx.strokeStyle = 'rgba(0, 0, 0, 255)';
    // 绘制纵向
    for (let i = 1; i < x_num; ++i) {
      const xy = transformUtil.mercator2LonLat([ mercatorBox[0] + i * stepX, mercatorBox[1] ]);
      const text = degreeUtil.formatDegree(xy[0]) + 'E';
      const t = textUtil._createText(layerCtx, stepWidth * i, 0, text, { side: 'top', fontSize: Math.ceil(12 * this.dpi / BASEDPI) });
      this.gridLinePadding.top = t > this.gridLinePadding.top ? t : this.gridLinePadding.top;
      const b = textUtil._createText(layerCtx, stepWidth * i, this.canvasHeight, text, { side: 'bottom', fontSize: Math.ceil(12 * this.dpi / BASEDPI) });
      this.gridLinePadding.bottom = b > this.gridLinePadding.bottom ? b : this.gridLinePadding.bottom;
      // layerCtx.beginPath();
      // layerCtx.moveTo(stepWidth * i, 0 + t);
      // layerCtx.lineTo(stepWidth * i, this.canvasHeight - b);
      // layerCtx.stroke();
    }
    // 绘制横向
    for (let i = 1; i < y_num; ++i) {
      const xy = transformUtil.mercator2LonLat([ mercatorBox[0], mercatorBox[3] - i * stepY ]);
      const text = degreeUtil.formatDegree(xy[1]) + 'N';
      const l = textUtil._createText(layerCtx, 0, stepHeight * i, text, { side: 'left', fontSize: Math.ceil(12 * this.dpi / BASEDPI) });
      this.gridLinePadding.left = l > this.gridLinePadding.left ? l : this.gridLinePadding.left;
      const r = textUtil._createText(layerCtx, this.canvasWidth, stepHeight * i, text, { side: 'right', fontSize: Math.ceil(12 * this.dpi / BASEDPI) });
      this.gridLinePadding.right = r > this.gridLinePadding.right ? r : this.gridLinePadding.right;
      // layerCtx.beginPath();
      // layerCtx.moveTo(0 + l, stepHeight * i);
      // layerCtx.lineTo(this.canvasWidth - r, stepHeight * i);
      // layerCtx.stroke();
    }
  },

};
