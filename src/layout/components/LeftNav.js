import {h} from 'preact'
import { Link } from 'preact-router/match';

const LeftNav = () => {

  const links = [
    {path: '/', name: '系统首页'},
    {path: '/can1page', name: 'CAN1端口'},
    {path: '/can2page', name:'CAN2端口'},
    {path: '/ipPage', name:'IP配置'},
    {path: '/updatePage', name:'固件升级'},
    {path: '/devicePage', name:'设备管理'},
  ]

  return(
    <div className="left">
      <nav className={"nav"}>
        {
          links.map(link => (<Link className="link-item" activeClassName={"active"} href={link.path}>{link.name}</Link>))
        }
      </nav>
    </div>
  )
}

export default  LeftNav

