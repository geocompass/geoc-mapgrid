'use strict';
module.exports = {
  _createText(ctx, x, y, text, { fontSize = 12, side = 'top' } = {}) {
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.font = `${fontSize}px Arial`;
    let curx = x;
    let cury = y;
    let result = 0;
    const text_width = Math.round(ctx.measureText(text).width);
    switch (side) {
      case 'top':
        curx = x - text_width / 2;
        cury = y + fontSize;
        result = fontSize;
        break;
      case 'bottom':
        curx = x - text_width / 2;
        cury = y;
        result = fontSize;
        break;
      case 'left':
        curx = x;
        cury = y + fontSize / 3;
        result = text_width;
        break;
      case 'right':
        curx = x - text_width;
        cury = y + fontSize / 3;
        result = text_width;
        break;
      default:
        return;
    }
    ctx.fillText(text, curx, cury);
    ctx.restore();
    return result;
  },
};
