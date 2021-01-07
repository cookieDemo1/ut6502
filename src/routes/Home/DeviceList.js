import Title from "../../components/Title";
const DeviceList = (props) => {
  const {data} = props

  return(
    <div id="device-list">
      <Title message={"设备初始化参数"}/>
      <div className="item-parent">
        <div className="item item-first">
          <p>设备名称</p>
          <p>{data.name}</p>
        </div>
        <div className="item">
          <p>版本号</p>
          <p>{data.version}</p>
        </div>
        <div className="item">
          <p>IP地址</p>
          <p>{data.ip}</p>
        </div>
        <div className="item">
          <p>MAC地址</p>
          <p>{data.mac}</p>
        </div>
      </div>
    </div>
  )
}




export default DeviceList