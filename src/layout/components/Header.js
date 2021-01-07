import {h} from 'preact'
import imgURL from '../../style/logo.png'
import {route} from "preact-router";
import {useEffect, useState} from "preact/hooks";
import {removeCookie, getCookie} from "../../utils";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(()=>{
    // let token = localStorage.getItem("token")
    let token = getCookie()

    if(token){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  })

  const logout = ()=>{
    let re = confirm("确定退出吗？")
    if(re === false){
      return
    }else if(re === true){
      // localStorage.removeItem("token")
      removeCookie()
      location.reload()
    }
  }

  return(
    <header className="header">
      <img className="header-img" src={imgURL} alt="图片加载失败" />
      <span className={"header-title"}>UT-6502</span>
      {
        isLogin ? <button onClick={logout} id="logout">退 出</button> :<></>
      }
      </header>
  )
}

export default Header

