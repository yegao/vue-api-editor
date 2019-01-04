function pickListByKey(arr, key) {
  return arr.map(function (val) {
    return val[key]
  })
}

function pickValueByPair(arr, key, value, only) {
  let list = arr.filter(function (v) {
    return v[key] === value
  })
  if (only) {
    return list[0]
  }
  return list
}

function shake(arr) {
  return arr.filter(function (v) {
    return v;
  })
}

function has(arr, key, value) {
  if (arguments.length === 3 && typeof key === 'string') {
    return !!arr.filter(function (v) {
      return v[key] === value
    }).length
  }
  else {
    return !!arr.filter(function (v) {
      return v === key
    }).length
  }
}

function del(arr, key, value) {
  // console.log(arguments.length)
  if (arguments.length === 3 && typeof key === 'string') {
    return arr.filter(function (v) {
      return v[key] != value
    })
  }
  else {
    return arr.filter(function (v) {
      return v != key
    })
  }
}

function toObject(arr, key) {
  let result = {};
  for (let value of arr) {
    result[value[key]] = value;
  }
  return result;
}

export default {
  has,
  del,
  pickListByKey,
  pickValueByPair,
  shake,
  toObject
}
