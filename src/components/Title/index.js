import {h} from "preact"
const Title = (props) => {
  const {message} = props
  return (
    <p id={"title"}>{message}</p>
  )
}

export default Title
