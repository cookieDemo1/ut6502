// message不是组件，只是一个函数,用来提示消息
const message = (props)=>{
  // message为消息
  // type类型 success, error
  // duration
  const {message, type = "success", duration = 2000} = props

  const success = {
    bgc: "#F7FBEF",
    color: "#63C339"
  }
  const error = {
    bgc: "#FFF3F7",
    color: "#F76D6B",
  }


  let body = document.body
  let parent = document.createElement("div")
  let text = document.createTextNode(message)
  parent.appendChild(text)
  parent.setAttribute("class", "message")

  if(type === "success"){
    parent.style.background = success.bgc
    parent.style.color = success.color
  }else if(type === "error"){
    parent.style.background = error.bgc
    parent.style.color = error.color
  }
  parent.style.opacity = "0"
  body.appendChild(parent)
  parent.style.opacity = "1"


  setTimeout(()=>{
    parent.style.display = "none"
    body.removeChild(parent)
  }, duration)

}

export default message