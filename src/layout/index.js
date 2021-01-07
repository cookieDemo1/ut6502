import {h} from 'preact'
import Header from "./components/Header";
import LeftNav from "./components/LeftNav";
import RightContent from "./components/RightContent";
import Login from './Login/index'
import {useEffect, useState} from "preact/hooks";
import {getCookie, removeCookie} from "../utils";
import {route} from "preact-router";
const Layout = ()=> {

  // 监听浏览器关闭或者页面关闭，需要重新登录
  // window.onbeforeunload = function (e) {
  //   debugger
  //   console.log(location.pathname)
  //   route(location.pathname)
  // }

  const [isLogin, setIsLogin] = useState(false)

  // 页面刷新的时候判断是否有token
  useEffect(()=>{
    // let token = localStorage.getItem("token")
    let token = getCookie()

    if(token){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  })

  const handleLogin = () => {
    // let token = localStorage.getItem("token")
    let token = getCookie()

    if(token){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }

  }

  return(
    <div className='home'>
      <Header/>

      {
        isLogin?
          (
            <div className="container">
              <LeftNav/>
              <RightContent/>
            </div>
          ):
          (
            <Login onLogin={handleLogin}/>
          )
      }
    </div>
  )
}

export default Layout