import {h} from 'preact'
import {useEffect, useState} from "preact/hooks";
import {request,transform1, transform3} from "../../utils";
import message from "../Message";

// data是数据，number代表是哪一个CAN口下的ware
// 1表示CAN1口下的ware, 2d表示CAN2口下的Ware
const WareList = (props)=> {

  // 父组件传递过来的数据，number代表哪个口下的滤波
  const {number} = props

  // 将父组件传递过来的数据复制到List中
  const [list, setList] = useState([])

  const [form, setForm] = useState({mode: '0', startz: undefined, endz: undefined})
  // 使能滤波。0未选中， 1选中
  const [ware_status, setWareStatus] = useState(undefined)

  // 获取首页数据
  // 需要重新组织数据
  useEffect(()=>{
    getWareData()
    getWareStatus()
  }, [])

  // 获取滤波数据
  const getWareData = ()=>{
    let path = `/can${number}/getWareData`
    request({
      path,
      method: 'GET'
    }).catch(err => {
      console.log(err)
    }).then(res => {
      console.log(res)
      if(res === "" || res === undefined || res === null || res===`empty:"1"`){
        return
      }
      let result = transform3(res)
      setList(result)
    })
  }


  // 获取滤波使能状态
  const getWareStatus = ()=>{
    let path = `/can${number}/getWareStatus`
    request({
      path,
      method: 'GET'
    }).catch(err => {
      console.log(err)
    }).then(res => {
      if(res === "" || res === undefined || res === null || res===`empty:"1"`){
        return
      }
      console.log(res)
      let result = transform1(res)
      let ware_status = eval(result.ware_status)
      setWareStatus(ware_status)

    })
  }


  const wareStatusChange = (e) =>{
    console.log(e.target.name, e.target.checked)
    setWareStatus(e.target.checked)
  }

  // 监听input数据的改变，将改变的数据重新设置到form中
  const handleChangeFrom =(e) => {
    let t_form = {...form}
    t_form[e.target.name] = e.target.value
    setForm(t_form)
    console.log(t_form)
  }


  // 删除列表中的某个元素
  const delListItem = (index_outer)=> {
    console.log(index_outer)
    let t_list = [...list]
    t_list.forEach((item, index_inner) => {
      if(index_outer === index_inner){
        t_list.splice(index_outer, 1)
      }
    })
    setList(t_list)
  }

  // 往列表中添加一个元素
  const pushList = () => {

    // 判断数据
    if(form.startz === undefined || form.startz === ""){
      message({type: "error", message: "起始帧不能为空！", duration: 2000})
      return
    }else if(form.endz === undefined || form.endz === ""){
      message({type: "error", message: "结束帧不能为空！", duration: 2000})
      return
    }else if(list.length >= 16){
      message({type: "error", message: "新增条数不能超过16!", duration: 2000})
      return
    }

    // 尝试eval将十六进制转换成10进制+，如果能够转换成功就是合法的十六进制数据
    try{
      eval("0x"+form.startz)
    }catch (e) {
      message({type: "error", message: "起始帧必须是合法的16进制数据！"})
      return;
    }

    try{
      eval("0x"+form.endz)
    }catch (e) {
      message({type: "error", message: "结束帧必须是合法的16进制数据！"})
      return;
    }

    // 判断结束帧必须大于或等于结束帧
    if(eval("0x"+form.startz) > eval("0x"+form.endz)){
      message({type: "error", message: "起始帧不能大于结束帧", duration: 2000})
      return;
    }

    let t_list = [...list]
    t_list.push({mode: form.mode, startz: "0x"+form.startz, endz: "0x"+form.endz})
    setList(t_list)
  }

  // 提交到后台
  const handleApply = ()=> {
    // 判断路径
    let path = `/can${number}/setWareData`
    // 组织数据
    let data = {
      ware_status:  ware_status ? "true" : "false",
      list: list,
    }

    request({
      method: "POST",
      path,
      data: JSON.stringify(data),
    }).then(res => {
      message({type: "success", message: "设置成功！", duration: 2000})
      getWareData()
    }).catch(err => {
      message({type: "error", message: "设置失败！", duration: 2000})
    })


  }



  return(
    <div className="ware-list">
      <div>
        <span className="key" style={{marginRight: '5px'}}>模式</span>
        <select name="mode" id="" value={form.mode} onChange={handleChangeFrom}>
          <option value="0">标准帧组ID滤波</option>
          <option value="1">扩展帧组ID滤波</option>
        </select>
        <span className="key">起始帧id 0x</span>
        <input type="text" name="startz" value={form.startz} onChange={handleChangeFrom}/>
        <span className="key">结束帧id 0x</span>
        <input type="text" name="endz" value={form.endz} onChange={handleChangeFrom}/>
        <button className="mini-btn" onClick={pushList}>添加</button>
      </div>

      <table>
        <tr>
          <th>编号</th>
          <th>滤波类型</th>
          <th>起始帧ID</th>
          <th>结束帧ID</th>
          <th>操作</th>
        </tr>

        {
          list.map((item, index) => {
            return(
              <tr>
                <td>{index}</td>
                <td>{item.mode == 0 ? '标准帧组ID滤波' : '扩展帧组ID滤波'}</td>
                <td>{item.startz}</td>
                <td>{item.endz}</td>
                <td><span className="delete" onClick={delListItem.bind(undefined, index)}>×</span></td>
              </tr>
            )
          })
        }
      </table>
      <div style={{marginTop: "15px", textAlign: "center"}}>
        <span style={{fontSize: "14px", display: "inlineBlock", marginRight: "8px"}}>使能滤波</span>
        <input type="checkbox" name="ware_status" defaultChecked={ware_status} onChange={wareStatusChange}/>
        <button className="btn btn-primary apply" onClick={handleApply}>提交</button>
      </div>
    </div>
  )
}

export default WareList