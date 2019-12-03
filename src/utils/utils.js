/*
 * @description: 常用工具函数
 * @Author: lal
 * @Date: 2019-11-14 10:21:52
 * @LastEditors: lal
 * @LastEditTime: 2019-12-03 14:59:02
 */

/**
 *
 * @description 防抖函数
 * @param {function} fn 被防抖的function
 * @param {number} ms 等待时间
 * @param {*} ctx 上下文 默认为this
 */
const debounce = (fn, ms = 250, ctx = this) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(ctx, args), ms);
  };
};

/**
 *
 * @description 节流函数
 * @param {function} fn  被节流的函数
 * @param {number} wait 节流的时间
 */
const throttle = (fn, wait = 250) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

export { debounce, throttle };
