'use strict';
module.exports = {
  removeGridLine() {
    this.gridLineLayer.ctx.clearRect(0, 0, this.gridLineLayer.width, this.gridLineLayer.height);
    this.showGrid = false;
    this.clearAll();
    this._render();
  },
  _addGridLineToCanvas() {
    this.ctx.drawImage(this.gridLineLayer.canvas, 0, 0, this.gridLineLayer.width, this.gridLineLayer.height, 0, 0, this.canvasWidth, this.canvasHeight);
    // const imageData = this.gridLineLayer.ctx.getImageData(0, 0, this.gridLineLayer.width, this.gridLineLayer.height);
    // this.ctx.putImageData(imageData, 0, 0);
  },
  drawGridLine() {
    const { top, right, bottom, left } = this.gridLinePadding;
    const layerCtx = this.gridLineLayer.ctx;
    layerCtx.clearRect(0, 0, this.gridLineLayer.width, this.gridLineLayer.height);
    const x_num = this.gridColumns;
    const y_num = this.gridRows;
    // const box = this.box;
    if (x_num > 30 || y_num > 30) {
      console.log('大于30个');
    }

    // const stepX = Math.ceil(((box[2] - box[0]) / x_num) * 100) / 100;
    const stepWidth = Math.ceil(this.canvasWidth / x_num);
    // const stepY = Math.ceil(((box[3] - box[1]) / y_num) * 100) / 100;
    const stepHeight = Math.ceil(this.canvasHeight / y_num);
    layerCtx.globalAlpha = 1;
    layerCtx.strokeStyle = 'rgba(0, 0, 0, 255)';
    // 绘制纵向
    for (let i = 1; i < x_num; ++i) {
      // const text = util.formatDegree(box[0] + i * stepX) + 'E';
      // const t = this._createText(layerCtx, stepWidth * i, 0, text, { side: 'top' });
      // const b = this._createText(layerCtx, stepWidth * i, this.canvasHeight, text, { side: 'bottom' });
      layerCtx.beginPath();
      layerCtx.moveTo(stepWidth * i, 0 + top);
      layerCtx.lineTo(stepWidth * i, this.canvasHeight - bottom);
      layerCtx.stroke();
    }
    // 绘制横向
    for (let i = 1; i < y_num; ++i) {
      // const text = util.formatDegree(box[3] - i * stepY) + 'N';
      // const l = this._createText(layerCtx, 0, stepHeight * i, text, { side: 'left' });
      // const r = this._createText(layerCtx, this.canvasWidth, stepHeight * i, text, { side: 'right' });
      layerCtx.beginPath();
      layerCtx.moveTo(0 + left, stepHeight * i);
      layerCtx.lineTo(this.canvasWidth - right, stepHeight * i);
      layerCtx.stroke();
    }
  },
};
