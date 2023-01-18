import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn/Login";
import SignUP from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/f-home" element={<Home />} />
          <Route exact path="/signUp" element={<SignUP />} />
          <Route exact path="/trips" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;