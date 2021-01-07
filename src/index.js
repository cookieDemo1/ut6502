import './style';
import {h,Component} from "preact";
import Layout from "./layout/index";


class App extends Component{

  render() {
    return(
      <div id="app">
        <Layout/>
      </div>
    )
  }
}


export default App