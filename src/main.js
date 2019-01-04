import "diff2html/dist/diff2html.min.css";
import task from './utils/task.js'
import date from './utils/date.js'
import math from './utils/math.js'
import session from './utils/session.js'
import object from './utils/object.js'
import array from './utils/array.js'
import string from './utils/string.js'
import cookie from './utils/cookie.js'
import dom from './utils/dom'
import { Diff2Html } from 'diff2html'

import vuescroll from 'vuescroll'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'

Vue.use(VueClipboard);
Vue.use(vuescroll);
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#424D6B',
    keepShow:true
  },
  rail: {
    background: '#eeeeee',
    size: '2px',
  },
}
Vue.prototype.task = task
Vue.prototype.date = date
Vue.prototype.math = math
Vue.prototype.session = session
Vue.prototype.object = object
Vue.prototype.array = array
Vue.prototype.string = string
Vue.prototype.cookie = cookie
Vue.prototype.dom = dom;
Vue.prototype.Diff2Html = Diff2Html;

// var querystring = require('querystring');
// Vue.prototype.querystring=querystring;
// let axios = require('axios')
// axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios)
// 全局过滤器
Vue.filter('decimal', function (value, bit) {
  if(value==='0'){
    return value
  }else{
    return (+value).toFixed(bit)
  }
})

Vue.prototype.$_$get = function (prop, def) {
  const properties = prop.split('.')
  let temp = this
  for (const key of properties) {
    temp = temp[key]
    if (!temp) {
      return def
    }
  }
  return temp
}

// 实例化
window.VM = new Vue({
  el: '#app',
  // router,
  // store,
  render: h => h(App)
})