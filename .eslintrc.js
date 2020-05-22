/*
 * @description:
 * @Author: lal
 * @Date: 2019-12-03 15:00:23
 * @LastEditors: lal
 * @LastEditTime: 2020-05-14 14:39:46
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
