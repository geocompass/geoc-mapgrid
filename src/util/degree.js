'use strict';
exports.formatDegree = data => {
  const degree = parseInt(data);
  // toFixed 为了保证精度问题 117.2 - 117 = 0.20000000000000284
  const min = parseInt(Number(data - degree).toFixed(12) * 60);
  const sec = parseInt(Number(data - degree).toFixed(12) * 3600 - min * 60);
  return degree + '°' + min + '′' + sec + '″';
};
