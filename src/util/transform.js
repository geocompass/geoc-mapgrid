'use strict';
// const MAXEXTENT = 20037508.342789244;
module.exports = {
  lonLat2Mercator(lonLat) {
    const mercator = [];
    const x = lonLat[0] * 20037508.342789 / 180;
    let y = Math.log(Math.tan((90 + lonLat[1]) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.342789 / 180;
    mercator.push(x);
    mercator.push(y);
    return mercator;
  },
  mercator2LonLat(xy) {
    const lonLat = [];
    const x = xy[0] / 20037508.342789 * 180;
    let y = xy[1] / 20037508.342789 * 180;
    y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
    lonLat.push(x);
    lonLat.push(y);
    return lonLat;
  },
};
