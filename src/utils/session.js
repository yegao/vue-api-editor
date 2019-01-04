import object from './object.js'

function get (key) {
  return JSON.parse(sessionStorage.getItem(key))
}

function set (key, value) {
  if (object.isPlain(value)) {
    return sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    throw Error('the second argument must be a plain object!')
  }
}

function remove (key) {
  sessionStorage.removeItem(key)
}

function clear () {
  sessionStorage.clear()
}

export default {
  get,
  set,
  remove,
  clear
}
