import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LogIn from "./components/LogIn/Login";
import SignUP from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUP />} />
          <Route exact path="/signUp" element={<SignUP />} />
          <Route exact path="/trips" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;