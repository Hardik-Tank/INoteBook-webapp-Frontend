import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoteState from "./Context/Notes/NoteState";
import Navbar from "./Component/Navbar";
import { Home } from "./Component/Home";
import About from "./Component/About";
import { Alert } from "./Component/Alert";
import Signup from "./Component/Signup";
import Login from "./Component/Login";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is an amazing React course" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
