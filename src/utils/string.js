// 字符串工具方法
// @author yegao
// @time   2018/07/01

/**
 * 求传入的所有字符串的长度之和
 * @return {Number} 传入的所有字符串的长度之和
 */
function total (...args) {
  return args.reduce(function (value, next, index, arr) {
    return value + next.length
  }, 0)
}

/**
 * 判断字符串之中是否存在传入的所有的字符串
 * @return {Boolean}
 */
function has (s, ...args) {
  return args.reduce(function (value, next, index, arr) {
    return value && !!~s.indexOf(next)
  }, true)
}

/**
 * 判断字符串中是否存在传入的字符串中的至少某一个元素
 * @return {Boolean}
 */
function hasOneOf (s, ...args) {
  return args.some(function (value) {
    return !!~s.indexOf(value)
  })
}

/**
 * 判断字符串是否就是传入的字符串的组合
 * @return {Boolean}
 */
function consist (s, ...args) {
  return has(s, ...args) && s.length === total(...args)
}

export default { total, has, hasOneOf, consist }
