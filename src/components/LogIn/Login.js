import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container , Form, Button } from 'react-bootstrap';
import { auth, logInWithEmailAndPassword } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "./../../assets/images/PackXLogo.png";
import UserSignIn from "./../../assets/images/UserSignIn.png";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [isMobile, setMobile] = useState(window.matchMedia("only screen and (max-width: 760px)").matches)
  const navigate = useNavigate();
  useEffect(() => { 
    const handleMobile = () => {
      setMobile(window.matchMedia("only screen and (max-width: 760px)").matches)
    };
    window.addEventListener('resize', handleMobile);
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return ( 
    <Container className='d-flex login-container'>
      <div id='loginForm' className={`m-auto p-3 align-items-center shadow ${isMobile === false ? "col-md-5" : "w-100"}`}>
        <div className="text-center">
            <img alt={logo} src={logo} className="my-3"/> 
        </div> 
        <div className="text-center">
            <img alt={UserSignIn} src={UserSignIn}/>
        </div>
        <Form.Group className="m-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your Email" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="m-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your Password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <div className="text-center">
            <Button variant="primary" type="submit" className='loginBtn' onClick={() => logInWithEmailAndPassword(auth, email, password)}>
                Sign In
            </Button> 
            <p className='py-3 text-dark'>Don’t have an account? <Link to="/signUp">Sign up Here!</Link></p>
        </div>
      </div>
    </Container>
  );
}
export default Login;