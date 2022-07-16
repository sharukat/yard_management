
import "./App.css";

import Sidebar from "./component/sidebar/Sidebar";
import Topbar from "./component/topbar/Topbar";
import Container_In from "./pages/container_in/Container_In";

function App() {
  return (
    <div className="App">
      <Topbar/>
      <div className="container">
        <Sidebar/>
        <Container_In/>
      </div>
    </div>
  );
}

export default App;
