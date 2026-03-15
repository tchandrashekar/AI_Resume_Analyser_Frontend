/*import UploadResume from "./components/UploadResume";
import MatchResume from "./components/MatchResume";
import History from "./components/History";

function App(){

 return(

  <div style={{padding:"20px"}}>

   <h1>AI Resume Analyzer</h1>

   <UploadResume/>

   <hr/>

   <MatchResume/>

   <hr/>

   <History/>

  </div>

 );

}

export default App;
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import UploadResume from "./components/UploadResume";
import MatchResume from "./components/MatchResume";
import History from "./components/History";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <div className="shell">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/match" element={<MatchResume />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
