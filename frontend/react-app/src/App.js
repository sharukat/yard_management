
import "./App.css";

import Sidebar from "./component/sidebar/Sidebar";
import Topbar from "./component/topbar/Topbar";
import Container_In from "./pages/container_in/Container_In";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container_Out from "./pages/container_out/Container_Out";

function App() {
  return (
    <div className="App">
      <Router>
        <Topbar/>
        <div className="container">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Container_In/>}/>
            <Route path="/container_out" element={<Container_Out/>}/>
          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;
