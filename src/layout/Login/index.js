import {h} from 'preact'

import './style.css'
import {useState} from "preact/hooks";
import {checkUsername, checkPassword, validate, request,setCookie} from "../../utils";
import message from "../../components/Message";

const Login = ({onLogin})=> {

  // 校验
  const rules = {
    username: {name: "username", rule: [checkUsername]},
    password: {name: "password", rule: [checkPassword]}
  }

  // 错误信息
  const [error, setError] = useState({username: '', password: ''})



  const [form, setForm] = useState({
    username: undefined,
    password: undefined,
  })

  // 设置值
  const  handleChange = (e) => {
    // 将原先的form设置成
    let temp_form = form
    temp_form[e.target.name] = e.target.value
    setForm(temp_form)
  }

  // 表单校验，失去焦点的时候校验
  const checkData = (e)=> {
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

  // 提交的时候校验表单的全部数据
  const checkDataAll = (form) => {

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

  // 密码框回车键登录
  const keyUpLogin = (e)=> {
    if(e.keyCode !== 13){
      return
    }
    login()
  }


  // 登录函数
  const login = async ()=> {
    // 判断是不是回车，不是回车则不进行登录

    checkDataAll()

    for(let key in error){
      console.log(error[key])
      if(error[key] !== undefined){
        message({type: "error", message: "用户名和密码不能为空！", duration: 2000})
        return
      }
    }

    let data = JSON.stringify(form)
    let status = "status:success".split(":")[1]
    console.log(status)
    request({method:'post', path: '/login', data}).then(res => {
      let status = res.split(":")[1]
      if(status === 'success'){
        setCookie()
        onLogin()
        message({type: "success", message: "登陆成功！", duration: 2000})
      }else{
       message({type: "error", message: "请输入正确的用户名和密码", duration: 2000})
      }
    }).catch(err => {
      message({type: "error", message: "登录失败！", duration: 2000})
    })

    // 本地运行打开，否则无法进入首页
    // localStorage.setItem('token', 'X468S4R&GHJA09*TYU!')
    setCookie()
    onLogin()
  }

  return(
    <div className={"login-root"}>
      <div className="login">
        <h3 className="login-tip">请登录</h3>
        <span>username</span>
        <input type="text"  name="username" value={form.username} maxLength={32}
               onChange={handleChange} onBlur={checkData} className="my-input"/>
        <p className="tip">{error.username}</p>


        <span>password</span>
        <input type="password"  name="password" value={form.password} maxLength={32}
               onChange={handleChange} onBlur={checkData} className="my-input" onKeyUp={keyUpLogin}/>
        <p className="tip">{error.password}</p>
        <button onClick={login}>Sign In</button>
      </div>
    </div>
  )
}

export default Login