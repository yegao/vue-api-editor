function mul (a, b) {
  var c = 0

  var d = a.toString()

  var e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}
function add (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (mul(a, e) + mul(b, e)) / e
}

function sub (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (mul(a, e) - mul(b, e)) / e
}

function div (a, b) {
  var c; var d; var e = 0

  var f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  return mul(c / d, Math.pow(10, f - e))
}
// 求和
function sum (...args) {
  return args.reduce(function (a, b) {
    return add((+a), (+b))
  })
}
// 获取数字的小数位数
function digit (a) {
  const temp = '' + a
  if (~temp.indexOf('.')) {
    return temp.split('.').slice(-1)[0].length
  }
  return 0
}
//将字符串转化成符合规则的数字
function number(s){
  return s.replace(/(^\.|[^(\d|\.)])/g, '').replace(/(\d+\.)(.*)/, function (x, $1, $2) {
    return $1 + $2.replace('.', '')
  }).replace(/^0([^\.])/g, '$1');
}
//不四舍五入截取小数位,返回number类型
function subNum(a, num) {
  var a_type = typeof (a);
  if (a_type == "number") {
    var aStr = a.toString();
    var aArr = aStr.split('.');
  } else if (a_type == "string") {
    var aArr = a.split('.');
  }
  if (aArr&&aArr.length > 1) {
    a = aArr[0] + "." + aArr[1].substr(0, num);
  }
  return +a
}
export default {
  add,
  sub,
  mul,
  div,
  sum,
  digit,
  number,
  subNum
}
