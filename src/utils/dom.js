function getElementById(id){
    return document.getElementById(id)
}
function scrollTopTo(target,vm) {
    let scrollT = document.body.scrollTop || document.documentElement.scrollTop
    let timer;
    let step;
    if (target == scrollT) {
        if(vm){
            vm.$store.commit('scrollTop',target)
        }
        return false;
    }
    if (scrollT > target) {
        timer = setInterval(function () {
            scrollT = document.body.scrollTop || document.documentElement.scrollTop
            step = Math.floor(-scrollT / 6);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
            if (scrollT <= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearInterval(timer);
            }
        }, 10)
    } else if (scrollT === 0) {
        timer = setInterval(function () {
            scrollT = document.body.scrollTop || document.documentElement.scrollTop
            step = 70
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
            if (scrollT >= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearInterval(timer);
            }
        }, 10)
    } else if (scrollT < target) {
        timer = setInterval(function () {
            scrollT = document.body.scrollTop || document.documentElement.scrollTop
            step = Math.floor(scrollT / 6);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
            if (scrollT >= target) {
                document.body.scrollTop = document.documentElement.scrollTop  = target;
                clearInterval(timer);
            }
        }, 10)
    }
}

function getScrollTop(){
    return document.body.scrollTop || document.documentElement.scrollTop
}

function getClientWidth(){
    return document.body.clientWidth
}

function getClientHeight(){
    return document.body.clientHeight
}

function getScrollHeight(){
    return document.body.scrollHeight
}

function getScrollWidth(){
    return document.body.scrollWidth
}
//获取相对于body的横向位置
function getX(e){
  var offset=e.offsetLeft;
  if(e.offsetParent!=null) offset+=getX(e.offsetParent);
  return offset;
}

function getY(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getY(e.offsetParent);
    return offset;
}
export default {
    getElementById,
    scrollTopTo,
    getScrollTop,
    getClientWidth,
    getClientHeight,
    getScrollHeight,
    getScrollWidth,
    getX,
    getY
}