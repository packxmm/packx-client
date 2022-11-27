import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container , Form, Button } from 'react-bootstrap';
import { auth, signInWithEmailAndPassword } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "./../../assets/images/PackXLogo.png";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  console.log(user)
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (

    <Container className='d-flex login-container'>
    <div id='loginForm' className='col-md-5 m-auto p-3 align-items-center'>
      <div className="text-center">
          <img alt={logo} src={logo}/>
          <h3>Log In to Dashboard</h3>
          <label>Enter your email and password below</label>
      </div>
      <Form.Group className="m-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="m-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <div className="text-center">
          <Button variant="primary" type="submit" className='loginBtn' onClick={() => signInWithEmailAndPassword(auth, email, password)}>
              Log in
          </Button> 
          <p className='py-3 text-dark'>Don’t have an account? <Link to="/signUp">Sign up Here!</Link></p>
      </div>
    </div>
    </Container>
  );
}
export default Login;