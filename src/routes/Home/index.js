import {h} from 'preact'
import {request, transform2, transfrom} from "../../utils";
import {useEffect, useState} from "preact/hooks";
import Title from "../../components/Title"
import DeviceList from "./DeviceList";
import CanList from "./CanList";


const Home = ()=> {

  // 设备数据
  const [device, setDevice] = useState({
    name: undefined,
    version: undefined,
    ip: undefined,
    mac: undefined,
  })

  // can1数据
  const [can1, setCan1] = useState({
    br: undefined,
    ctm: undefined,
    id: undefined,
    pt: undefined,
    ct: undefined,
    tlp: undefined,
    trp: undefined,
    tnp: undefined,
    tnm: undefined,
    tip: undefined
  })

  // can2数据
  const [can2, setCan2] = useState({
    br: undefined,
    ctm: undefined,
    id: undefined,
    pt: undefined,
    ct: undefined,
    tlp: undefined,
    trp: undefined,
    tnp: undefined,
    tnm: undefined,
    tip: undefined
  })

  useEffect(()=>{
    getDeviceData()
    getPort1Data()
    getPort2Data()
  },[])

  const getDeviceData = ()=> {
    // /home/getDeviceData
    request({
      path: "/home/getDeviceData",
      method: "get"
    }).then(res => {
      if(res === "" || res === undefined || res === null || res === `empty:"1"`){
        return
      }
      let result = transform2(res)
      setDevice(result)
    }).catch(err => {
      console.log(err)
    })
  }

  const getPort1Data = ()=> {
    // /home/getPort1Data
    request({
      path: "/home/getPort1Data",
      method: "get"
    }).then(res => {
      if(res === "" || res === undefined || res === null){
        return
      }
      let result = transform2(res)
      setCan1(result)
    }).catch(err => {
      console.log(err)
    })
  }

  const getPort2Data = () => {
    // /home/getPort2Data
    request({
      path: "/home/getPort2Data",
      method: "get"
    }).then(res => {
      if(res === "" || res === undefined || res === null){
        return
      }
      let result = transform2(res)
      setCan2(result)
    }).catch(err => {
      console.log(err)
    })
  }




  // 获取首页数据
  useEffect(()=>{

  },[])


  return(
    <div className="root device">
      <div id="home">
        <DeviceList data={device}/>
        <CanList can1={can1} can2={can2}/>
      </div>
    </div>
  )
}

export default Home