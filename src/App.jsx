import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar";
import { Home } from "./Component/Home";
import About from "./Component/About";
import { Alert } from "./Component/Alert";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import NotesHooks from "./Context/Notes/NotesHooks";

function App() {
  return (
    <>
      <NotesHooks>
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
      </NotesHooks>
    </>
  );
}

export default App;
