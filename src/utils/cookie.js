function set (name, value, seconds) {
  const exp = new Date()
  exp.setTime(exp.getTime() + seconds * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

function get (name) {
  let arr
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
}

function remove (name) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = get(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

export default {
  set,
  get,
  remove
}
