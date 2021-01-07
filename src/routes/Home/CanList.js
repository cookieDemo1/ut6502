import Title from "../../components/Title";
const CanList = (props) => {
  const {can1, can2} = props
  return(
    <div id="can-list">
      <div className="can1">
        <Title message={"CAN1端口参数"}/>
        <table className="can-table">
          <tr>
            <td>波特率</td>
            <td>{can1.br}</td>
          </tr>
          <tr>
            <td>模块CAN接口封包模式</td>
            <td>
              {can1.ctm === "1" ? "CAN固定格式传输" : ""}
              {can1.ctm === "0" ? "CAN透明传输" : ""}
            </td>
          </tr>
          <tr>
            <td>发送CAN帧ID</td>
            <td>{can1.id}</td>
          </tr>
          <tr>
            <td>CAN帧格式</td>
            <td>
              {can1.pt === "1" ? "扩展帧" : ""}
              {can1.pt === "0" ? "标准帧" : ""}
            </td>
          </tr>
          <tr>
            <td>CAN帧封包时间</td>
            <td>{can1.ct && can1.ct+" 秒"}</td>
          </tr>
          <tr>
            <td>模块端口号</td>
            <td>{can1.tlp}</td>
          </tr>
          <tr>
            <td>远程设备端口号</td>
            <td>{can1.trp}</td>
          </tr>
          <tr>
            <td>模块TCP/IP通信模式</td>
            <td>
              {can1.tnm === "1" ? "TCP" : ""}
              {can1.tnm === "0" ? "UDP" : ""}

            </td>
          </tr>
          <tr>
            <td>模块TCP/IP工作模式</td>
            <td>
              {can1.tnp === "1" ? "Client" : ""}
              {can1.tnp === "0" ? "Server" : ""}
            </td>
          </tr>
          <tr>
            <td>远程服务器IP地址</td>
            <td>{can1.tip}</td>
          </tr>
        </table>
      </div>
      <div className="can2">
        <Title message={"CAN2端口参数"}/>
        <table className="can-table">
          <tr>
            <td>波特率</td>
            <td>{can2.br}</td>
          </tr>
          <tr>
            <td>模块CAN接口封包模式</td>
            <td>
              {can2.ctm === "1" ? "CAN固定格式传输" : ""}
              {can2.ctm === "0" ? "CAN透明传输" : ""}
            </td>
          </tr>
          <tr>
            <td>发送CAN帧ID</td>
            <td>{can2.id}</td>
          </tr>
          <tr>
            <td>CAN帧格式</td>
            <td>
              {can2.pt === "1" ? "扩展帧" : ""}
              {can2.pt === "0" ? "标准帧" : ""}
            </td>
          </tr>
          <tr>
            <td>CAN帧封包时间</td>
            <td>{can2.ct && can2.ct+" 秒"}</td>
          </tr>
          <tr>
            <td>模块端口号</td>
            <td>{can2.tlp}</td>
          </tr>
          <tr>
            <td>远程设备端口号</td>
            <td>{can2.trp}</td>
          </tr>
          <tr>
            <td>模块TCP/IP通信模式</td>
            <td>
              {can2.tnp === "0" ? "UDP" : ""}
              {can2.tnp === "1" ? "TCP" : ""}

            </td>
          </tr>
          <tr>
            <td>模块TCP/IP工作模式</td>
            <td>
              {can2.tnm === "0" ? "Server" : ""}
              {can2.tnm === "1" ? "Client" : ""}
            </td>
          </tr>
          <tr>
            <td>远程服务器IP地址</td>
            <td>{can2.tip}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}




export default CanList