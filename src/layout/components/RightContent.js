import {h} from 'preact'
import { Router } from 'preact-router';

import Home from "../../routes/Home";
import Can1 from "../../routes/Can1/index"
import Can2 from "../../routes/Can2/index"
import Update from "../../routes/Update/index"
import Ip from "../../routes/Ip/index"
import Device from "../../routes/Device/index"



const RightContent = ()=> {
  const routers = [
    {path: '/', component: Home},
    {path: '/can1page', component: Can1},
    {path: '/can2page', component: Can2},
    {path: '/updatePage', component: Update},
    {path: '/ipPage', component: Ip},
    {path: '/devicePage', component: Device},

  ]

  const handelRoute = (e) => {}

  return(
    <div className="right">
      <Router onChange={handelRoute} >
        {
          routers.map(route => {
            const {component: MyComponent, path} = route
            return(
              <MyComponent path={path}></MyComponent>
            )
          })
        }
      </Router>
    </div>
  )
}

export default RightContent