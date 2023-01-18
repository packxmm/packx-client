import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container , Form, Button } from 'react-bootstrap';
import { auth, logInWithEmailAndPassword, getUserData } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "./../../assets/images/PackXLogo.png";
import FacilitySignIn from "./../../assets/images/FacilitySignIn.png";
import "./SignIn.css";
function SignIn() {
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
  }, [user, loading]);

  const logIn = () => {
    logInWithEmailAndPassword(email, password).then((res) => {
      getUserData(res).then((user) => { 
        if(user !== null){ 
          user.forEach((ele) => {
            var userData = ele.data();  
            console.log(userData.type)
            if(userData.type === "facility"){
              navigate("/f-home",{state: userData});
            }
          });
        } 
      }).catch((err) => console.log(err)); 
    });
  }

  return ( 
    <Container className='d-flex login-container'>
      <div id='loginForm' className={`m-auto p-3 align-items-center shadow ${isMobile === false ? "col-md-5" : "w-100"}`}>
        <div className="text-center">
            <img alt={logo} src={logo} className="my-3"/> 
        </div> 
        <div className="text-center">
            <img alt={FacilitySignIn} src={FacilitySignIn}/>
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
            <Button variant="primary" type="submit" className='loginBtn' onClick={logIn}>
                Sign In
            </Button> 
            <p className='py-3 text-dark'>Don’t have an account? <Link to="/signUp">Sign up Here!</Link></p>
        </div>
      </div>
    </Container>
  );
}
export default SignIn;