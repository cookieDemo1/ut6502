import {h} from "preact"
import WareList from "../../components/WareList";

const Ware1 =  ()=>{

  return (
    <>
      {/* 将number传递过去，WareList根据number判断是CAN1口还是CAN2口 */}
      <WareList number={1}/>
    </>
  )
}

export default Ware1