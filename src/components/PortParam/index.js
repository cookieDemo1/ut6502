import {h} from 'preact'
import Buttons from "../Buttons";
import {useEffect, useState} from "preact/hooks";
import {
  request,
  transform2,
  checkEmpty,
  checkIp,
  checkPort,
  check0x,
  checkSecond,
  validate,
  checkKeepAlive, checkCanID
} from "../../utils";
import message from "../Message";

const PortParam = (props)=> {

  // 可能的值为1和2， 1代表can1口， 2代表con2口
  const {number} = props

  // 存储表单对应的数据
  const [form, setForm] = useState({
    br: '1000',
    ctmode: '0',
    canid: undefined,
    pt: '0',
    ctimer: undefined,
    tnport: '0',
    tnmode: '1',
    telnetlp: undefined,
    telnetrp: undefined,
    telnetip: undefined,
    max_connection: '1',
    keep_alive: undefined
  })


  // 存储每条数据对应的规则
  const rules = {
    br: {name: "br", rule: []},
    ctmode: {name: "ctmode", rule: []},
    canid: {name: "canid", rule: [checkEmpty, checkCanID]},
    pt: {name: "pt", rule: []},
    ctimer: {name: "ctimer", rule: [checkEmpty, checkSecond]},
    tnport: {name: "tnport", rule: []},
    tnmode: {name: "tnmode", rule: []},
    telnetlp: {name: "telnetlp", rule: [checkEmpty, checkPort]},
    telnetrp: {name: "telnetrp", rule: [checkEmpty, checkPort]},
    telnetip: {name: "telnetip", rule: [checkEmpty, checkIp]},
    max_connection: {name: "max_connection", rule: []},
    keep_alive: {name: "keep_alive", rule: [checkEmpty, checkKeepAlive]}
  }

  // 存储输入的数据错误时，存放的错误信息，用于回显在页面
  const [error, setError] = useState({
    br: undefined,
    ctmode: undefined,
    canid: undefined,
    pt: undefined,
    ctimer: undefined,
    tnport: undefined,
    tnmode: undefined,
    telnetlp: undefined,
    telnetrp: undefined,
    telnetip: undefined,
    max_connection: undefined,
    keep_alive: undefined
  })

  useEffect(()=>{
    getPortData()
  },[])

  // 向后端请求数据
  const getPortData = () =>{
    let path = `/can${number}/getPortData`
    request({
      path,
      method: 'GET',
    }).then(res => {
      console.log(res)
      if(res === "" || res === undefined || res === null || res === `empty:"1"`){
        return
      }

      let result = transform2(res)
      console.log(result)
      setForm(result)
    }).catch(err => {
      message({type: "error", message: "获取数据失败", duration: 2000})
    })
  }

  // 监听表单值得改变，同步到form对象中
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    let t_form = {...form}
    t_form[e.target.name] = e.target.value
    setForm(t_form)
    console.log(t_form)
  }

  // 取消按钮，点击取消重新获取数据
  const handleCancel = ()=>{
    getPortData()
  }

  // 应用按钮
  const handleApply = ()=>{

    // 发送页面中有的数据，如果没有显示的数据，则不进行校验，并且不发送数据
    const data = {...form}

    // 模块CAN接口封包模式是(1[CAN固定格式传输],则不发送canid 和 pt字段到后台，并且不校验)
    if(data.ctmode === "1"){


      delete data.canid
      delete data.pt
      // Reflect.deleteProperty(data, "canid")
      // Reflect.deleteProperty(data, "pt")
    }

    if(data.tnmode === "0"){
      delete data.telnetrp
      delete data.telnetip
      // Reflect.deleteProperty(data, "telnetrp")
      // Reflect.deleteProperty(data, "telnetip")
    }

    // 校验数据，只校验筛选出来的数据
    let res = checkDataSubmit(data)
    console.log("res", res)
    if(res.length !== 0 ){
      message({type: "error", message: "请输入正确的数据！", duration: 2000})
      return
    }

    // 需要校验数据

    let path = `/can${number}/setPortData`
    request({
      path,
      method: 'POST',
      data: JSON.stringify(data)
    }).then(res => {
      message({type: "success", message: "修改成功!", duration: 2000})
    }).catch(err => {
      message({type: "error", message: "修改失败！", duration: 2000})
    })
  }

  const checkData = (e)=> {
    let name =  e.target.name
    let value = e.target.value

    // 会返回一个数组，如果有值则代表有错误信息.validate需要传递一个值和一个校验函数列表
    let res
    // 如果校验的是canid需要将pt参数也传递进去
    if(name === "canid"){
      res = validate(value, rules[name].rule, form.pt)
    }else{
      res = validate(value, rules[name].rule)
    }
    console.log(res)
    // 如果有值，将值push到error列表中。取第一个错误消息push
    if(res.length > 0){
      let first_error = {[name] : res[0]}
      console.log(first_error)
      setError({...error, ...first_error})
    }else {
      // 如果没有值(校验通过)，则把消息置位undefined
      let none_error = {[name] : undefined}
      setError({...error, ...none_error})
    }
  }

  const checkDataSubmit = (data) => {
    let response = []
    let result = {}
    for(let key in data){
      // console.log(key)
      let res
      // 如果校验的是canid需要将pt参数也传递进去
      if(key === "canid"){
        res = validate(form[key], rules[key].rule, form.pt)
      }else{
        res = validate(form[key], rules[key].rule)
      }

      if(res.length > 0){
        let t_error = {}
        t_error[key] = res[0]
        result = {...result, ...t_error}
        setError(result)
        response.push(res[0])
      }else {
        // 如果没有值(校验通过)，则把消息置位undefined
        let t_error = {}
        Object.assign(t_error, error)
        t_error[key] = undefined
        setError(t_error)
      }
    }
    return response
  }


  const checkDataAll = () => {
    let result = {}
    for(let key in form){
      console.log(key)
      let res = validate(form[key], rules[key].rule)
      if(res.length > 0){
        let t_error = {}
        t_error[key] = res[0]
        result = {...result, ...t_error}
        setError(result)
      }else {
        // 如果没有值(校验通过)，则把消息置位undefined
        let t_error = {}
        Object.assign(t_error, error)
        t_error[key] = undefined
        setError(t_error)
      }
    }
  }



  return(
    <>
    <div id="form-body">
      <div className="setting">
        <span className="key">CAN节点波特率</span>
        <select onChange={handleChange}  name="br" defaultChecked={form.br} value={form.br} onBlur={checkData}>
          {
            ["1000","800","500","400","250","125","100","80","50","40","20","10","5"].map(item => {
              return <option value={item}>{item}</option>
            })
          }
        </select>
        <span className="tip">kBit/s</span>
        <span className="error">{error.br}</span>
      </div>
      <div className="setting">
        <span className="key">模块CAN接口封包模式</span>
        <select onChange={handleChange} name="ctmode" defaultChecked={form.ctmode} value={form.ctmode} onBlur={checkData}>
          <option value="0">CAN 透明传输</option>
          <option value="1">CAN 固定格式传输</option>
        </select>
        <span className="tip"></span>
        <span className="error">{error.ctmode}</span>
      </div>
      { form.ctmode === "0" &&
      <>
        <div className="setting">
          <span className="key">CAN帧格式</span>
          <select onChange={handleChange} name="pt" value={form.pt} defaultChecked={form.pt} onBlur={checkData}>
            <option value="0">标准帧</option>
            <option value="1">扩展帧</option>
          </select>
          <span className="tip"></span>
          <span className="error">{error.pt}</span>
        </div>
        <div className="setting">
          <span className="key">发送CAN帧ID</span>
          <input type="text" name="canid" value={form.canid} onChange={handleChange} onBlur={checkData}/>
          <span className="tip">十六进制</span>
          <span className="error">{error.canid}</span>
        </div>
      </>
      }
      <div className="setting">
        <span className="key">CAN帧封包时间</span>
        <input type="text" name="ctimer" value={form.ctimer} onChange={handleChange} onBlur={checkData}/>
        <span className="tip">ms</span>
        <span className="error">{error.ctimer}</span>
      </div>
      <div className="setting">
        <span className="key">模块TCP/IP通信模式</span>
        <select onChange={handleChange} name="tnport" value={form.tnport} defaultChecked={form.tnport} onBlur={checkData}>
          <option value="0">UDP</option>
          <option value="1">TCP</option>
        </select>
        <span className="tip"></span>
        <span className="error">{error.tnport}</span>
      </div>


      <div className="setting">
        <span className="key">模块端口号</span>
        <input type="text" name="telnetlp" value={form.telnetlp} onChange={handleChange} onBlur={checkData}/>
        <span className="tip"></span>
        <span className="error">{error.telnetlp}</span>
      </div>

      <div className="setting">
        <span className="key">模块TCP/IP工作模式</span>
        <select onChange={handleChange} name="tnmode" value={form.tnmode} defaultChecked={form.tnmode} onBlur={checkData}>
          <option value="0">Server</option>
          <option value="1">Client</option>
        </select>
        <span className="tip"></span>
        <span className="error">{error.tnmode}</span>
      </div>

      {
        form.tnmode === "1" &&
        <>
          <div className="setting">
            <span className="key">远程服务器IP地址</span>
            <input type="text" name="telnetip" value={form.telnetip} onChange={handleChange} onBlur={checkData}/>
            <span className="tip"></span>
            <span className="error">{error.telnetip}</span>
          </div>

          <div className="setting">
            <span className="key">远程设备端口号</span>
            <input type="text" name="telnetrp" value={form.telnetrp} onChange={handleChange} onBlur={checkData}/>
            <span className="tip"></span>
            <span className="error">{error.telnetrp}</span>
          </div>
        </>
      }
      <div className="setting">
        <span className="key">最大连接数</span>
        <select onChange={handleChange} value={form.max_connection} defaultChecked={form.max_connection} name="max_connection" onBlur={checkData}>
          {
            [1,2,3,4,5,6,7,8,9,10].map(item => {
              return <option value={item}>{item}</option>
            })
          }
        </select>
        <span className="tip"></span>
        <span className="error">{error.max_connection}</span>
      </div>


      <div className="setting">
        <span className="key">保活时间</span>
        <input type="text" name="keep_alive" value={form.keep_alive} onChange={handleChange} onBlur={checkData}/>
        <span className="tip">second</span>
        <span className="error">{error.keep_alive}</span>
      </div>

      <Buttons onApply={handleApply} onCancel={handleCancel}></Buttons>
    </div>
  </>
  )
}

export default PortParam