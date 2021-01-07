import {h} from 'preact'
import {Link} from "preact-router/match";

import PortParam1 from "./PortParam1";
import Ware1 from "./Ware1";
import Tcp1 from "./Tcp1";
import {useState} from "preact/hooks";

const Can1Menu = () => {

  const [active, setActive] = useState(1)

  const changeActive = (num)=>{
    setActive(num)
  }

  return(
    <div className="root">
      <ul className={'top-menu'}>
        <li onClick={() => changeActive(1)} className={active === 1 && "top-active"}>端口参数</li>
        <li onClick={() => changeActive(2)} className={active === 2 && "top-active"}>滤波</li>
        <li onClick={() => changeActive(3)} className={active === 3 && "top-active"}>TCP状态</li>
      </ul>
      <div className="form" id="can1">
      {
        active === 1 && <PortParam1/>
      }
      {
        active === 2 && <Ware1/>
      }
      {
        active === 3 && <Tcp1/>
      }
      </div>
    </div>
  )

}

export default Can1Menu