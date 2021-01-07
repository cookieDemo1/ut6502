import {h} from "preact"
import WareList from "../../components/WareList";

const Ware2 =  ()=>{
  return (
    <>
      {/* 将number传递过去，WareList根据number判断是CAN1口还是CAN2口 */}
      <WareList number={2}/>
    </>
  )
}

export default Ware2