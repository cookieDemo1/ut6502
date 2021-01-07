import {useEffect, useState} from "preact/hooks";
import {request, transform3} from "../../utils";
import message from "../Message";

const TcpList = (props) => {
  const {number} = props

  const [list, setList] = useState([])

  // 请求数据
  useEffect(()=>{
    getTcpData()
  },[])

  const getTcpData = () => {
    let path = `/can${number}/getTcpData`
    request({
      path,
      method: 'GET'
    }).catch(err => {
      message({type: "error", message: "获取数据失败！", duration: 2000})
    }).then(res => {

      // 如果传递过来的数据为空，不进行转换
      if(res === "" || res === undefined || res === null || res===`empty:"1"`){
        return
      }

      let result = transform3(res)
      setList(result)

    })
  }

  return(
    <div className="tcp-list">

      <table>
        <tr>
          <th>IP地址</th>
          <th>端口</th>
          <th>状态</th>
          <th>tr</th>
          <th>tx</th>
        </tr>

        {
          list.map((item, index) => {
            return(
              <tr>
                <td>{item.ip}</td>
                <td>{item.port}</td>
                <td>{item.status}</td>
                <td>{item.tx}</td>
                <td>{item.tr}</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  )
}


export default TcpList