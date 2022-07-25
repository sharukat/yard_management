
import "./App.css";

import Sidebar from "./component/sidebar/Sidebar";
import Topbar from "./component/topbar/Topbar";
import Container_In from "./pages/container_in/Container_In";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container_Out from "./pages/container_out/Container_Out";
import ContainerOut from "./pages/cont_out/ContainerOut";
import ContainerIn from "./pages/cont_in/ContainerIn";
import ContainerReservation from "./pages/cont_rsv/ContainerReservation";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Topbar/> */}
        <div className="container">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<ContainerIn/>}/>
            <Route path="/containerOut" element={<ContainerOut/>}/>
            <Route path="/containerReservation" element={<ContainerReservation/>}/>
          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;
