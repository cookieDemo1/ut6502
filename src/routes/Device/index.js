import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";
import {request, transform1} from "../../utils";
import message from "../../components/Message";

export default ()=> {

  // 存储设备名称的对象.第二个参数是函数，用来设置值，是一个异步的函数
  const [name, setName] = useState(undefined)

  // 存储用密码的对象
  const [password, setPassword] = useState({
    old_password: undefined,
    new_password: undefined,
  })

  // 相当于生命周期方法
  useEffect(()=>{
    getName()
  },[])

  // 获取设备名称
  const getName = () => {
    request({
      path: "/device/getDeviceName",
      method: "get",
    }).then(res => {
      if(res === "" || res === undefined || res === null || res === `empty:"1"`){
        return
      }
      let data = transform1(res, ":")
      setName(data.name)
    }).catch(err => {
      console.log(err)
    })
  }

  // 监听设备名称改变
  const changeName = (e)=> {
    setName(e.target.value)
  }

  // 修改设备名称
  const handleChangeName = () => {
    if(name === undefined || name === ''){
      message({type: "error", message: "设备名称不能为空！", duration: 2000})
      return
    }
    request({
      path: "/device/setDeviceName",
      method: "POST",
      data: JSON.stringify({name: name})
    }).then(res => {
      message({type: "success", message: "修改成功！", duration: 2000})
    }).catch(err => {
      message({type: "error", message: "修改失败！", duration: 2000})
    })
  }


  // 监听密码值改变
  const changePassword = (e) => {
    let t_password = {...password}
    t_password[e.target.name] = e.target.value
    setPassword(t_password)
  }

  // 修改密码
  const handleChangePassword = () => {
    if(password.old_password === undefined || password.old_password === ""){
      message({type: "error", message: "旧密码不能为空！", duration: 2000})
      return
    }else if(password.new_password === undefined || password.new_password === ""){
      message({type: "error", message: "新密码不能为空！", duration: 2000})
      return;
    }
    request({
      path: "/device/setPassword",
      method: "POST",
      data: JSON.stringify(password)
    }).then(res => {
      message({type: "success", message: "修改成功！", duration: 2000})
    }).catch(err => {
      message({type: "error", message: "修改失败", duration:2000})
    })
  }

  // 复位
  const handleRecover = () => {
    request({
      path: "/device/reset",
      method: "POST"
    }).then(res => {
      message({type: "success", message: "复位成功!", duration: 2000})
    }).catch(err => {
      message({type: "error", message: "复位失败!", duration: 2000})
    })
  }

  // 重启配置
  const handleReboot = () => {
    request({
      path: "/device/reboot",
      method: "POST",
    }).then(res => {
      message({type: "success", message: "重启成功！", duration: 2000})
    }).catch(err => {
      message({type: "error", message: "重启失败！", duration: 2000})
    })
  }



  return(
    <div className="root">
      <div className="form" id="device">
        <div className="name">
          <p>设备名称</p>
          <input type="text" maxLength={16} onChange={changeName} value={name} name="name" placeholder="最大长度为16个字符"/>
          <button className="btn btn-primary" onClick={handleChangeName}>修改</button>
        </div>
        <div className="password">
          <p>修改密码</p>
          <div className="setting">
            <span>旧密码</span>
            <input name="old_password" onChange={changePassword} maxLength={16} value={password.old_password} placeholder="最大长度为16个字符"/>
          </div>
          <div className="setting">
            <span>新密码</span>
            <input name="new_password" onChange={changePassword} maxLength={16} value={password.new_password} placeholder="最大长度为16个字符"/>
          </div>
          <button className="btn btn-primary change-password" onClick={handleChangePassword}>修改</button>
        </div>
        <div className="system">
          <div className="recover">
            <p>复位</p>
            <span>初始化值</span>
            <button className="btn btn-primary" onClick={handleRecover}>复位</button>
          </div>
          <div className="reboot">
            <p>重启配置</p>
            <span>重启配置</span>
            <button className="btn btn-primary" onClick={handleReboot}>重启配置</button>
          </div>
        </div>
      </div>
    </div>
  )
}