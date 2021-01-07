import {h} from 'preact'
import {request} from "../../utils";
import message from "../../components/Message";

export default ()=>{

  // 触发事件
  const handleFileSelect = ()=> {
    let file = document.getElementById("file")
    file.click()
  }

  // 设置文件名显示在屏幕上
  const handleFileChange = (e)=>{
    let fileName = document.getElementById('file-name')
    let name = e.target.value.split('\\')
    name = name[name.length - 1]
    fileName.innerText = name || "未选择任何文件"
  }

  // 点击升级
  const handleUpdate = ()=> {
    let file = document.getElementById("file").files[0]
    if(file){
      let data = new FormData()
      data.append("file", file)

      // 需要进度条

      // updateStart(data)

      request({
        isFile: true,
        method: 'POST',
        path: '/update/fimwareUpdate',
        data,
      }).then(res => {
        message({type: "success", message: "升级成功！", duration: 2000})
      }).catch(err => {
        message({type: "error", message: "升级失败！", duration: 2000})
      })

    }else{
      message({type:"error", message: "请选择文件后再升级！", duration: 2000})
    }
  }

  // 封装网络请求.这里需要进度条
  // const updateStart = (data)=> {
  //   // TODO 进度条
  //   debugger
  //   const xhr = new XMLHttpRequest()
  //   console.log(xhr.upload)
  //   xhr.upload.addEventListener("progress", function (e) {
  //     console.log(e.total)
  //   }, false)
  //
  //   if(xhr.upload){
  //     xhr.upload.onprogress = function(e){
  //       console.log(e.total)
  //     }
  //   }
  //
  //   xhr.open("POST",'/update/fimwareUpdate', true )
  //
  //   xhr.send(data)
  //
  // }

  return(
    <div className="root">
      <div className="form" id="update">
        <div className="tip">固件升级: 如确认升级固件请点击升级！</div>
        <div className="box">
          <p>固件升级</p>
          <div className="file">
            <span>文件位置</span>
            <button onClick={handleFileSelect}>选择文件</button>
            <span id="file-name">未选择任何文件</span>
            <input type="file" name="file" id="file" style={{display: 'none'}}  onChange={handleFileChange}/>
          </div>
          <button className="btn btn-primary btn-update" style={{marginTop: '20px'}} onClick={handleUpdate}>升级</button>
        </div>
      </div>
    </div>
  )
}