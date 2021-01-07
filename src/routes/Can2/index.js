import {h} from 'preact'
import {useState} from "preact/hooks";
import PortParam2 from "./PortParam2";
import Ware2 from "./Ware2";
import Tcp2 from "./Tcp2";

const Can2Menu = () => {
  const [active, setActive] = useState(1)

  const changeActive = (num)=>{
    setActive(num)
  }

  return(
    <div className="root">
      <ul className='top-menu'>
        <li onClick={() => changeActive(1)} className={active === 1 && "top-active"}>端口参数</li>
        <li onClick={() => changeActive(2)} className={active === 2 && "top-active"}>滤波</li>
        <li onClick={() => changeActive(3)} className={active === 3 && "top-active"}>TCP状态</li>
      </ul>
      <div className="form" id="can2">
        {
          active === 1 && <PortParam2/>
        }
        {
          active === 2 && <Ware2/>
        }
        {
          active === 3 && <Tcp2/>
        }
      </div>
    </div>
  )
}

export default Can2Menu
