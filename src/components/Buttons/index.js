import {h} from 'preact'

const Buttons = ({onCancel, onApply}) => {
  return(
    <div className="buttons">
      <button className="btn btn-cancel" onClick={onCancel}>取消</button>
      <button className="btn btn-primary" onClick={onApply}>应用</button>
    </div>
  )
}

export default Buttons