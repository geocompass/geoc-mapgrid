'use strict';
/**
 * 为了处理Node.js调用与浏览器调用
 */
class BaseUtil {
  constructor() {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      if (document instanceof (typeof HTMLDocument !== 'undefined' ? HTMLDocument : Document)) {
        this.document = document;
      } else {
        this.document = document.implementation.createHTMLDocument('');
      }
      this.window = window;
    } else {
      // assume we're running under node.js when document/window are not present
      const jsdom = require('jsdom');
      const virtualWindow = new jsdom.JSDOM(
        decodeURIComponent('%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E')
      ).window;
      this.document = virtualWindow.document;
      this.window = virtualWindow;
    }
  }
}
module.exports = BaseUtil;
