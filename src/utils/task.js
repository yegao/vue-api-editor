const listeners = {}
const preSetTimeout = function (callback, seconds, id, context) {
  if (listeners[id]) {
    return
  }
  if (typeof callback === 'function') {
    if (typeof id === 'string') {
      const action = function () {
        callback.call(context)
        listeners[id] = setTimeout(action, seconds)
      }
      action()
    }
  }
}

const stop = function (id) {
  if (listeners[id]) {
    clearTimeout(listeners[id])
    delete listeners[id]
  }
}

const clear = function () {
  for (const key in listeners) {
    stop(key)
  }
}

export default {
  listeners,
  preSetTimeout,
  stop,
  clear
}
