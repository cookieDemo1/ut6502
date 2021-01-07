// 导出请求函数，该函数返回一个promise
export function request(options){
  return new Promise((resolve, reject) => {
    // 从options中获取到path(请求路径), method(请求方法，不穿默认是GET), data(请求体数据), success(成功回调), fail(失败回调)
    const {path, method='GET', data={}, success, fail, isFile = false} = options
    // eslint-disable-next-line no-undef
    let request = window.XMLHttpRequest ? new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP')

    request.onreadystatechange = () => {
      if(request.readyState === 4){
        if(request.status >=200 && request.status < 300){
          // debugger
          let jsonStart = request.responseText.indexOf("{")
          if(jsonStart === -1){
            resolve(request.responseText)
          }else{
            resolve(request.responseText)
            // resolve(JSON.parse(request.responseText.slice(jsonStart)))
          }
        }else if(request.status >= 400){
          reject(request)
        }
      }
    }
    request.open(method, path, true)
    // 如果不是文件则加请求头，上传文件的时候不能加请求头（不加浏览器才会自动将文件转换成二进制数据流）
    if(!isFile){
      request.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
    }
    request.send(data)
  })
}

// 数据校验

// 校验mac地址（返回true为验证通过，返回false为验证不通过）
export function checkMac(mac){
  let reg=/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/;

  // 校验不通过返回错误信息，通过不返回任何信息
  if(!reg.test(mac)){
    return"MAC地址格式错误"
  }
}

// 端口校验
export function checkPort(port) {
  let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  if(!reg.test(port)){
    return "端口值为0~65535！"
  }
}

// 校验ip地址
export  function checkIp(ip) {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if(!reg.test(ip)){
    return "IP地址格式错误！"
  }
}

// 校验网关
export  function checkGateway(gateway) {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if(!reg.test(gateway)){
    return "网关格式错误！"
  }
}


// 校验子网掩码
export function checkNetmask(netmask){
  let reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/
  if(!reg.test(netmask)){
    return "子网掩码格式错误！"
  }
}

// 校验不能为空
export function checkEmpty(value) {
   if(value === undefined || value ==='' || value === null){
     return "不能为空！"
   }
}

export function checkUsername(value) {
  if(value === undefined || value=== '' || value === null){
    return "用户名不能为空！"
  }
}

export function checkPassword(value) {
  if(value === undefined || value==='' || value === null){
    return "密码不能为空！"
  }
}

// 校验十六进制数据
export function check0x(value) {
  value = "0x" + value
  console.log(value)
  try{
    // 将数据转换成10进制
    const v = eval(value)
    if(v < 0x00 || v > 0xFF){
      // return "必须在0x00~0xFF之间！"
    }

  }catch{
    return "必须是16进制数！"
  }
}

// 校验canid,需要做特殊的判断，十六进制数据
export function checkCanID(value, pt) {
  // 将全部转换成小写，判断是不是0x开头，如果不是则补上0x
  // value = value.toLowerCase()
  // value = value.indexOf("0x") === -1 ? "0x"+value : value

  value = "0x" + value
  try{
    // 将数据转换成10进制
    const v = eval(value)
    if(pt === "0"){
      if(v<0x00 || v> 0x7FFF){
        return "标准帧在0x00~0x7FFF之间！"
      }
    }else if(pt === "1"){
      if(v<0x00 || v> 0x1FFFFFFF) {
        return "扩展帧在0x00~0x1FFFFFFF之间！"
      }
    }else{
      if(v < 0x00 || v > 0xFF){
        return "必须在0x00~0xFF之间！"
      }
    }



  }catch{
    return "必须是16进制数！"
  }
}

// 检验时间（秒数，只要是一个10进制数据即可）
export function checkSecond(value) {
  let reg = /^\+?[1-9][0-9]*$/
  if(!reg.test(value)){
    return "必须是正整数！"
  }
}


// 校验保活时间
export function checkKeepAlive(value) {
  let reg = /^\+?[0-9][0-9]*$/
  if(!reg.test(value)){
    return "必须是正整数！"
  }
}


// 校验数据. pt为CAN帧格式，如果传递了pt,代表数据是canid.
// 对canid的校验需要特殊处理，需要两个参数进行校验
export function validate(value, rules, pt=undefined) {
  // console.log("value", value)
  // console.log('rules', rules)
  // 存放错误信息列表
  let result = []
  rules.forEach(rule => {
    // 返回错误信息，如果是undefined则是校验正确没有返回任何信息，将undefined舍弃
    let message
    if(rule === checkCanID){
      message = rule(value, pt)
    }else{
      message = rule(value)
    }
    if(message !== undefined){
      result.push(message)
    }
  })
  // 将错误信息列表返回
  return result
}



// 将字符串转换成对象 "name:hadoop"转换成{name: "hadoop"}
export function transform1(str, re1=":") {
  let arr = str.split(re1)
  let data = {}
  data[arr[0]] = arr[1]
  return data
}

// 将字符串转换成对象
// "ip:192.168.1.10,port:8080,id:1aed,username:root,password:123456"
// arg1: 传入的字符串， arg2:分隔符1(,), arg2:分隔符2(:)
export function transform2(str, re1=",", re2=":"){
  let ls1 = str.split(re1)
  let ls2 = ls1.map(item => {
    return item.split(re2)
  })
  let data = {}
  ls2.forEach(item => {
    data[item[0]] = item[1]
  });
  return data
}

// 将字符串转换成对象 ; , :
export function transform3(str, re1=";", re2=",", re3=":"){
  let result = []
  let row = {}

  let rows = str.split(re1)
  for(let i=0; i< rows.length; i++){
    let items = rows[i].split(re2)
    row = {}
    for(let i=0; i<items.length; i++){
      let item = items[i].split(re3)
      row[item[0]] = item[1]
    }
    result.push(row)
  }
  return result
}




// 登录相关（简单的登录）
export function getCookie(){
  return document.cookie
}

export function  setCookie() {
  document.cookie = "token=X468S4R&GHJA09*TYU!"
}

export function removeCookie() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}


