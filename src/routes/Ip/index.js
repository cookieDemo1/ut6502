import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";
import Buttons from "../../components/Buttons";
import Title from "../../components/Title";
import {checkEmpty, checkGateway, checkIp, checkNetmask, request, transform2, validate} from "../../utils";
import message from "../../components/Message";

export default () => {

  // 错误信息
  const rules = {
    mode: {name: "mode", rule: []},
    sip: {name: "sip", rule: [checkEmpty, checkIp]},
    mip: {name: "mip", rule: [checkEmpty, checkNetmask]},
    gip: {name: "gip", rule: [checkEmpty, checkGateway]}
  }

  const [error, setError] = useState({mode: undefined, sip: undefined, mip: undefined, gip: undefined})

  const [form, setForm] = useState({
    mode: "0",
    sip: undefined,
    mip: undefined,
    gip: undefined,
  })

  // 获取数据
  useEffect(()=>{
    getIpData()
  }, [])

  // 获取数据
  const getIpData = () => {
    request({
      path: "/ip/getIpData",
      method: "GET"
    }).then(res => {
      if(res === "" || res === undefined || res === null || res === `empty:"1"`) return
      let data = transform2(res)
      console.log(data)
      setForm({...form, ...data})
    }).catch(err => {

    })
  }

  // 设置值
  const handleChange = (e) => {
    // 将原先的form设置成
    let temp_form = {...form}
    console.log(e.target.value)
    temp_form[e.target.name] = e.target.value
    setForm(temp_form)
    console.log(form)
  }

  // 应用，应用之前先校验全部数据
  const handleApply = ()=> {
    let data = {}
    // 如果是dhcp模式则只传递dhcp的数据。且不需要校验数据
    if(form.mode === "0"){
      data.mode = "0"
    }else if(form.mode === "1"){
      // 如果是static模式则传递全部数据，且需要检验数据
      checkDataAll()
      // 判断error有没有值，如果有值则代表有数据错误，则提示错误，并且return回去
      for(let key in error){
        console.log(error[key])
        if(error[key] !== undefined){
          message({type: "error", message: "请输入正确的数据！", duration: 2000})
          return
        }
        data = {...form}
      }
    }

    request({
      path: "/ip/setIpData",
      method: "POST",
      data: JSON.stringify(data)
    }).then(res => {
      message({type: "success", message: "应用成功！", duration: 2000})
    }).catch(err => {
      message({type: "error", message: "应用失败！", duration: 2000})
    })
  }

  // 取消按钮重新请求数据
  const handleCancel = ()=> {
    getIpData()
  }

  // 检查数据，失去焦点的时候检查
  const checkData = (e) => {
    let name =  e.target.name
    let value = e.target.value
    console.log(name, value)
    // 会返回一个数组，如果有值则代表有错误信息.validate需要传递一个值和一个校验函数列表
    let res = validate(value, rules[name].rule)
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

  // 将数据从form中取出来，循环调用checkData函数，将每一个都校验一遍
  // 用于提交到后台的时候，校验全部数据
  const checkDataAll = () => {
    // let t_error = {...error}
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
    <div className="root">
      <div className="form" id="ip">
        <Title message="IP地址配置"></Title>
        <ul>
          <li>
            <span>IP模式设置</span>
            <select name="mode" id="" onChange={handleChange} value={form.mode}>
              <option style={{height: '34px'}} value="0">DHCP/AutoIP</option>
              <option style={{height: '34px'}} value="1">Static IP</option>
            </select>
          </li>
          { form.mode === "1" &&
            (<div>
                <li>
                  <span>静态IP地址</span>
                  <input type="text" name="sip" value={form.sip} onChange={handleChange} onBlur={checkData}
                         disabled={form.mode === '0'}/>
                  <span id="err">{error.sip}</span>
                </li>
                <li>
                  <span>子网掩码</span>
                  <input type="text" name="mip" value={form.mip} onChange={handleChange} onBlur={checkData}
                         disabled={form.mode === '0'}/>
                  <span id="err">{error.mip}</span>
                </li>
                <li>
                  <span>网关</span>
                  <input type="text" name="gip" value={form.gip} onChange={handleChange} onBlur={checkData}
                         disabled={error.mode === '0'}/>
                  <span id="err">{error.gip}</span>
                </li>
              </div>
            )
          }
          <li>
            <Buttons onApply={handleApply} onCancel={handleCancel}/>
          </li>
        </ul>
      </div>
    </div>
  )
}