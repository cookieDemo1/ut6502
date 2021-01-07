// let re = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
//
// console.log(re.test('30000'))


let obj = {
  box_door: "true",
  box_led: "true",
  box_sd: "70",
  box_wd: "70",
  device_power: "70",
  light_port: "true",
  port1: "false",
  port2: "false",
}


for(let [key, value] of Object.entries(obj)){
  obj[key] = eval(value)
}


console.log(obj)

// console.log(Object.entries(obj))