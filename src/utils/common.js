import {setcookie,getcookie} from './commonFcu.js'
var getDataYear = function(format, timestamp) {//时间戳转化
  if(timestamp == null||timestamp == undefined||timestamp == 0){
    return ''
  }
    var date = new Date(timestamp ? (parseInt(timestamp) * 1000) : new Date().getTime());
    var FORMAT = new Object();
    FORMAT = {
        'Y': "date.getFullYear()",
        'M': "date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1",
        'D': "date.getDate() < 10 ? '0' + date.getDate() : date.getDate()",
        'h': "date.getHours() < 10 ? '0' + date.getHours() : date.getHours()",
        'm': "date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()",
        's': "date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()"
    }
    for (var i in FORMAT) {
      if (format.indexOf(i) != -1) {
        format = format.replace(i, eval(FORMAT[i]));
    }
  }
  return format;
}
//获取国籍列表
var getCardTypes=function(_this,success){
  ajax(_this,_this.extendApi.dataCardtypes,{},(response)=>{
    if(response.code == 200){
      success(response.data)
    }else{
      _this.$notify({
        title: '失败',
        message: response.message,
        type: 'error',
        duration:'1000',
      });
    }
  },'GET',true)
}
//获取国籍列表
var getCountryList=function(_this,success){
  let param={
    type:'code'
  }
  ajax(_this,_this.extendApi.getCountry,param,(response)=>{
    if(response.code == 200){
     // console.log(response.data)
      success(response.data)
    }
    else{
      _this.$notify({
        title: '失败',
        message: response.message,
        type: 'error',
        duration:'1000',
      });
    }
  },'GET',true)
}
//获取银行列表
var getbanklist = function(_this) {
    // var _this=this;
    ajax(_this, _this.extendApi.bankList, '', function(response) {
      var data = response.data;
      for (var i in data) {
        _this.banklist.push({
          'value': i,
          'label': data[i]
        });
      }
    })
}
//获取省份列表
var getprovice = function(_this) {
    // var _this=this;
    ajax(_this, _this.extendApi.provinceList, '', function(response) {
      var data = response.data;
      for (var i in data) {
        _this.provice.push({
          'value': i,
          'label': data[i]
        });
      }
    })
}
//获取验证码
var sendyzm = function(_this, codetype, vparam, mobile) {
    var postdata = {
      'mobile': mobile,
      'codetype': codetype,
      'vparam': vparam
    }
    ajax(_this, _this.extendApi.sendSms, postdata, function(response) {
      if (response.code == 200) {
        _this.$notify({
          title: '提示',
          message: '短信发送成功，请注意查收',
          type: 'success'
        });
        if (codetype == 'realinfo') {
          _this.scode = setInterval(function() {
            lasscode(_this, 0);
          }, 1000);
        } else if (codetype == 'bindcoinaddress') {
          _this.scode = setInterval(function() {
            lasscode(_this, 2);
          }, 1000);
        } else if (codetype == 'bindbankcard') {
          _this.scode = setInterval(function() {
            lasscode(_this, 3);
          }, 1000);
        } else if (codetype == 'setpayword') {
          _this.scode = setInterval(function() {
            lasscode(_this, 4);
          }, 1000);
        } else if (codetype == 'coinout_btc') {
          _this.scode = setInterval(function() {
            lasscode(_this, 6);
          }, 1000);
        } else if (codetype == 'cashout') {
          _this.scode = setInterval(function() {
            lasscode(_this, 7);
          }, 1000);
        }
      } else {
        _this.$notify({
          title: '提示',
          message: response.message,
          type: 'error'
        });
      }
    })
}
/* ajax请求 */
const ajax = function(that, url, params, success, method, header) {
  var token = sessionStorage.getItem('access_token');
  if (method == 'GET') {
    if(!header){
      that.axios({
        method: 'get',
        url: url,
        headers: {
          Authorization: 'Bearer '+ token,
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
        params: params,
        // timeout:5000,
      }).then((response) => {
        success(response.data);
      }).catch(function(response) {
        console.log(response);
      })
    }else{
      that.axios({
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
         'Access-Control-Allow-Headers':'X-Requested-With,content-type'
        },
        params: params,
        // timeout:5000,
      }).then((response) => {
        success(response.data);
      }).catch(function(response) {
        console.log(response);
      })
    }
  } else {
    if(!header){
      params = that.querystring.stringify(params);
      that.axios({
        method: "POST",
        url: url,
        headers: {
          Authorization: 'Bearer '+ token,
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
        data: params,
      }).then((response) => {
        success(response.data);
      }).catch(function(response) {
        console.log('请求失败');
      })
    }else{
      params = that.querystring.stringify(params);
      that.axios({
        method: "POST",
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
        data: params,
      }).then((response) => {
        success(response.data);
      }).catch(function(response) {
        console.log('请求失败');
      })
    }

  }
}

/* ajax请求 */
var ajax2 = function(that, url, params, success, method) {
  let token = sessionStorage.getItem('token');
  if(method=='GET'){
    that.axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type':'application/x-www-form-urlencoded;',
      },
     params:params,
    }).then((response) => {
      success(response.data);
    }).catch(function(response){
      console.log(response);
    })
  }else{
    params=that.querystring.stringify(params);
    that.axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type':'application/x-www-form-urlencoded;',
      },
     data:params,
    }).then((response) => {
      success(response.data);
    }).catch(function(response){
      console.log(response);
    })
  }
}

//提交反馈 ——————Va
var axio = function(that,url,params,success,error) {
  var token = '68b09443f024f4e52fd67910ba0760e2bb1d20f1';
  params = that.querystring.stringify(params);
  that.axios({
    method: "POST",
    url: url,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded;',
    },
    data: params,
  }).then((response) => {
    success(response);
  }).catch((err) => {
    error(err);
  })
}
//手机验证码获取  _self是this,param是参数，success是回调
var getPhoneValidate=function(_self,url,param,success){
  ajax(_self,url,param,(response)=>{
    if(response.code == 200){
      success(response.data);
      _self.$notify({
        title: '成功',
        message: '验证码发送成功',
        type: 'success',
        duration:'1000',
      });
      // return;
    }else{
      _self.$notify({
        title: '失败',
        message: response.message,
        type: 'error',
        duration:'1000',
      });
       // return;
    }
  });
}
//邮箱验证码获取  _self是this,param是参数，success是回调
var getEmailValidate=function(_self,url,param,success){
  ajax(_self,url,param,(response)=>{
    if(response.code == 200){
      success(response.data);
      _self.$notify({
        title: '成功',
        message: '验证码已发送至邮箱',
        type: 'success',
        duration:'1000',
      });
      // return;
    }else{
      _self.$notify({
        title: '失败',
        message: response.message,
        type: 'error',
        duration:'1000',
      });
       // return;
    }
  });
}

//获取用户认证状态
var getStates=async function(_self,success){
  await ajax(_self,_self.extendApi.getstates,'',(response)=>{
    if(response.code == 200){
      success(response.data);
      return;
    }else{
      console.log(response.message);
       return;
    }
  });
}
//图片上传  ---上传认证证件
var uploadImg=function(_self,param,success){
  _self.axios({
    method: "POST",
    url: _self.extendApi.getImgMid,
    headers: {
      'FZM-Ca-AppKey': 'zhaobi',
    },
    data: param,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
  }).then((response) => {
    success(response.data);
  }).catch(function(response) {
    console.log('请求失败');
  })
}

var savecookie = function(data) {
  setcookie('zhaobi_username', data.base.username);
  setcookie('zhaobi_adddate', data.base.adddate);
  setcookie('zhoaobi_addtime', data.base.addtime);
  setcookie('zhaobi_email', data.base.email);
  setcookie('zhaobi_group', data.base.group);
  setcookie('zhaobi_regip', data.base.regip);
}
var sublogion = function(_this, pageindex) { //登录
  ajax(_this, _this.extendApi.getToken, _this.login, function(res) {
    if (res.code == 200) {
      var data = res.data;
      setcookie('zhaobi_token', data.access_token);
      setcookie('zhaobi_refreshtoken', data.refresh_token);
      // if(data.group=="unauthorized"){//强制认证
      //    _this.dialogVisible =true;
      //    return ;
      // }
      var tokenexpressTime = parseInt(data.expires_in);
      var logintime = parseInt(new Date().getTime() / 1000);
      var deadtime = logintime + tokenexpressTime;
      setcookie('zhaobi_deadtime', deadtime);
      setcookie('zhaobi_id', data.userid);
      ajax(_this, _this.extendApi.getUserInfo, '', function(data) {
        savecookie(data.data);
        _this.username = data.data.base.username;
        let isShow = { after:false,before:true,username:_this.username}
          _this.$emit('showState',isShow);
        if (pageindex == 'index') {
          _this.$router.push({
            // path: '/usercenter/bcctrade'
          });
        } else {
          _this.$emit('tradeSuccess');
        }
      })
    } else {
      _this.$notify({
        title: '提示',
        message: res.message,
        type: 'warning',
        duration: '2000'
      });
    }
  }, 'POST')
}
var goregister = function(_this, pageindex) { //注册接口
  // var _this=this;
  ajax(_this, _this.extendApi.userReg, _this.regester, function(res) {
    if (res.code == 200) {
      _this.$notify({
        title: '提示',
        message: '注册成功',
        type: 'success'
      });
      _this.login.email = _this.regester.email;
      // console.log();
      _this.login.password = _this.regester.password;
      sublogion(_this, pageindex);
    } else {
      _this.$notify({
        title: '提示',
        message: res.message,
        type: 'warning'
      });
    }
  })
}
//获取行情信息
var getmainListT = function(_this){
  ajax(_this,_this.extendApi.getmarketList,_this.getList,function(res){
    if(res.code == 200){
      if(res.data.marketdata.sell == ""){

      }else{
        _this.inputbuyname = res.data.marketdata.sell[0].price;//默认价格(买入)
      }
      _this.sellList = (res.data.marketdata.sell).reverse();// 卖行情（倒序)
      _this.sellListCount = res.data.marketdata.sell.length;
      _this.buyList = res.data.marketdata.buy;// 买行情
      _this.accountList = res.data.trade;//第二个行情
      _this.newprice = res.data.trade[0];
      _this.loading = false;//loading
      if(_this.buyList == ""){

      }else{
        _this.inputsellname = _this.buyList[0].price;//默认价格(卖出)
      }
    }else{
      _this.$notify({
        title: '提示',
        message: res.message,
        type: 'warning'
      });
    }
  },'GET')
}

//获取行情信息 ——————By Va
var getMarketList = function(that,param,success){
  ajax(that,that.extendApi.getmarketList,param,(res)=>{
    if(res.code == 200){
      success(res);
    }else{
      that.$notify({
        title: '提示',
        message: res.message,
        type: 'warning'
      });
    }
  },'GET')
}

//获取交易明细
var getOrderT = function(that){
  ajax(that,that.extendApi.getOrderList,that.order,(res)=>{
    if(res.code == 200){
      that.orderList = res.data.data;
      that.loading1 = false;
    }else{
      that.$notify({
        title: '提示',
        message: res.message,
        type: 'warning'
      });
    }
  },'GET')
}

/*闪电交易or专业交易 成交单
* 参数\表格    最近成交单  我的委托单   我的成交单
*order_statu      all         open       history
*                                    ————————By Va
*/
var getAllOrder = function(that,param,success){
  ajax(that,that.extendApi.getOrderList,param,(res)=>{
    if(res.code == 200){
      success(res);
    }else{
      that.$notify({
        title: '提示',
        message: res.message,
        type: 'warning'
      });
    }
  },'GET')
}

//获得我的资产
var getMyAssest= function(_self,success){
  ajax(_self,_self.extendApi.getassesrList,'',(res)=>{
    if(res.code == 200){
      success(res);
      // _self.assestAmount = res.data.list;
      // _self.chuliassest();
    }else{
      console.log(res.message);
    }
  },'GET')
}
//获取验证码
var countDown = function(_this,show,count){
  const TIME_COUNT = 60;
  if(!_this.timer){
   _this.count = TIME_COUNT;
   _this.show = false;
   _this.timer = setInterval(() => {
   if(_this.count > 0 && _this.count <= TIME_COUNT){
     _this.count--;
     }else {
    _this.show = true;
      clearInterval(_this.timer);
      _this.timer = null;
      }
    },1000)
  }
}
// 时间戳转化
var timestamp = function(val,format){
  format=format||"Y/M/D";
  // var newDate=new Date();
  // newDate.setTime(val);
  var newDate=new Date(val);
  var year =newDate.getFullYear();
  var month =("0"+(newDate.getMonth()+1)).substr(-2);
  var date = ("0"+newDate.getDate()).substr(-2);
  var hour = ("0"+newDate.getHours()).substr(-2);
  var minute = ("0"+newDate.getMinutes()).substr(-2);
  var second = ("0"+newDate.getSeconds()).substr(-2);
  var time1=format.replace("Y",year);
  time1=time1.replace("M",month);
  time1=time1.replace("D",date);
  time1=time1.replace("h",hour);
  time1=time1.replace("m",minute);
  time1=time1.replace("s",second);
  return time1;
}
//显示买卖信息提示框
var showMsgbox = function(obj){
  let oBox = obj.this.$refs[obj.ref];
  oBox.style.display = 'block';
  setTimeout(()=>{
    oBox.style.display = 'none';
  },obj.duration)
}

export {
  getCardTypes,
  getCoinData,
  getCountryList,
  getbanklist,
  getprovice,
  sendyzm,
  ajax,
  axio,
  getPhoneValidate,
  getEmailValidate,
  getStates,
  uploadImg,
  getDataYear,
  savecookie,
  sublogion,
  goregister,
  getmainListT,
  getMarketList,
  getOrderT,
  getAllOrder,
  getMyAssest,
  countDown,
  timestamp,
  showMsgbox,
}
