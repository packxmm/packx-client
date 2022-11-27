import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerWithEmailAndPassword } from "../../firebase"
import { Container ,Form, Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap';
import logo from "./../../assets/images/PackXLogo.png";
import './SignUp.css';

export default function SignUP() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setName] = useState("");
    const [facilityName, setFacilitylName] = useState("")
    const [gender, setGender] = useState("")
    const [DOB, setDOB] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
    const [address, setAddress] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [errorMsg, setErrmsg] = useState();
    const [successMsg, setSucmsg] = useState(); 
    const [isNameEmpty, setNameEmpty] = useState(false);
    const [isFacilityEmpty, setFacilityEmpty] = useState(false);
    const [isEmailEmpty, setEmailEmpty] = useState(false);
    const [isPasswordEmpty, setPasswordEmpty] = useState(false);
    const [isPhoneNoEmpty, setPhoneNoEmpty] = useState(false);
  
    useEffect(() => {
      if (isCPasswordDirty) {
          if(password === confirmPassword) {
              setShowErrorMessage(false);
          }else {
              setShowErrorMessage(true)
          }
      } 
    }, [confirmPassword])
  
    const handleCPassword = (e) => {
      setConfirmPassword(e.target.value);
      setIsCPasswordDirty(true);
    }
  
    const register = () => { 
      if (!displayName) setNameEmpty(true);
      if (!facilityName) setFacilityEmpty(true);
      if (!email) setEmailEmpty(true);
      if (!password) setPasswordEmpty(true);
      if (!phoneNo) setPhoneNoEmpty(true);
      
      if(isNameEmpty === false && isFacilityEmpty === false && isEmailEmpty === false && isPasswordEmpty === false && isPhoneNoEmpty === false){ 
        registerWithEmailAndPassword(displayName, email, password, facilityName, gender, DOB, address, phoneNo ).then((res) => {
          console.log(res)
          if (res.code === 200) {
            setSucmsg(res)
          } else {
            setErrmsg(res)
          }
          setTimeout(() => window.location.reload(), 1000);
        });
      }
    };
  
    const radioHandler = (status) => {
      setGender(status);
    };
  
    return (
      
      <Container fluid>
          <Container fluid className="paddingZero">
          <Row>
              <div className="text-center p-3">
                  <img src={logo} alt="PackX"/>
                  <h3 className="my-2 header">Create Your Facility Account</h3>
                  <label>Please fill in this  form to create a facility account.</label>
              </div>
              <Col md={8} className="d-flex m-auto p-3 align-items-center">
                  <Form className="w-100 shadow rounded py-3">
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Full Name <strong>*</strong></Form.Label>
                          </Col>
                          <Col md={8}> 
                            <Form.Control type="text" placeholder="Enter your Name" isInvalid={isNameEmpty} value={displayName} onChange={(e) => {setName(e.target.value);setNameEmpty(false);}}/>
                            <Form.Control.Feedback type='invalid'>
                                {'Your name is required!'}
                            </Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Facility Name <strong>*</strong></Form.Label>
                          </Col>
                          <Col md={8}> 
                            <Form.Control type="text" placeholder="Please Fill Your Company Name" isInvalid={isFacilityEmpty} value={facilityName} onChange={(e) => {setFacilitylName(e.target.value);setFacilityEmpty(false)}}/>
                            <Form.Control.Feedback type='invalid'>
                                {'Your Company name is required!'}
                            </Form.Control.Feedback>
                          </Col>
                      </Form.Group> 
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Email <strong>*</strong></Form.Label>
                          </Col>
                          <Col md={8}> 
                            <Form.Control type="email" placeholder="Enter your email" isInvalid={isEmailEmpty}  value={email} onChange={e => {setEmail(e.target.value);setEmailEmpty(false)}}/>
                            <Form.Control.Feedback type='invalid'>
                                {'Your Email is required!'}
                            </Form.Control.Feedback>
                          </Col>
                      </Form.Group> 
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Password <strong>*</strong></Form.Label>
                          </Col>
                          <Col md={8}> 
                            <Form.Control type="password" placeholder="Enter your password" isInvalid={isPasswordEmpty} value={password} onChange={e => {setPassword(e.target.value);setPasswordEmpty(false)}}/>
                            <Form.Control.Feedback type='invalid'>
                                {'Your Password is required!'}
                            </Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Confirm Password <strong>*</strong></Form.Label>
                          </Col>
                          <Col md={8}> 
                            <Form.Control type="password" placeholder="Confirm your password" isInvalid={showErrorMessage}  value={confirmPassword} onChange={handleCPassword}/>
                            <Form.Control.Feedback type='invalid'>
                                {'The password confirmation does not match!'}
                            </Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Gender</Form.Label>
                          </Col>
                          <Col md={8}> 
                            <Form.Check type="radio" name="gender" label="Male" inline onClick={(e) => radioHandler("male")}/>
                            <Form.Check type="radio" name="gender" label="Female" inline onClick={(e) => radioHandler("female")}/>
                          </Col>
                      </Form.Group>
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Date of Birth</Form.Label>
                          </Col>
                          <Col md={8}> 
                            <Form.Control type="date" placeholder="Please Fill Your Company Name" value={DOB} onChange={(e) => setDOB(e.target.value)}/>
                          </Col>
                      </Form.Group> 
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Address</Form.Label>
                          </Col>
                          <Col md={8}>  
                            <Form.Control type="text" placeholder="Please Fill Your Address" as="textarea" value={address} onChange={(e) => setAddress(e.target.value)}/>
                          </Col>
                      </Form.Group>
                      <Form.Group className="m-3 row">
                          <Col md={4}> 
                            <Form.Label>Phone Number <strong>*</strong></Form.Label>
                          </Col>
                          <Col md={8}>  
                            <Form.Control type="number" placeholder="Please Fill Your Phone Number eg: +65xxxxxxxxx"  isInvalid={isPhoneNoEmpty} value={phoneNo} onChange={(e) => {setPhoneNo(e.target.value);setPhoneNoEmpty(false)}}/>
                            <Form.Control.Feedback type='invalid'>
                                {'Your Phone Number is required!'}
                            </Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                      <div className="text-center">
                          <Button variant="primary" className='registerBtn my-3' onClick={register}>Create Account</Button>
                          {errorMsg !== undefined ? ( 
                              <ToastContainer position="top-end" className="p-3">
                                  <Toast>
                                      <Toast.Body className="bg-danger text-white rounded"> {errorMsg}</Toast.Body>
                                  </Toast>
                            </ToastContainer>) : (
                              <label></label>
                          )}
                          {successMsg !== undefined ? ( 
                              <ToastContainer position="top-end" className="p-3">
                                  <Toast>
                                      <Toast.Body className="bg-success text-white rounded"> {successMsg}</Toast.Body>
                                  </Toast>
                            </ToastContainer>) : (
                              <label></label>
                          )}
                        </div>
                  </Form>
              </Col>
          </Row>
          </Container> 
      </Container> 
    );
}