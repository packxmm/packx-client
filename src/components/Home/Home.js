import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container , Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar';
import {getTripsFacility } from "../../firebase.js";
import { BsPlusCircle } from "react-icons/bs";
import Loading from '../Loading/Loading';
import 'react-calendar/dist/Calendar.css';
import "./Home.css";

export default function Home() {
  const location = useLocation(); 
  const [userData] = useState(location.state);
  const [tripsData, setTripsData] = useState([]);  
  const [finishedtripsData, setFinishedTripsData] = useState([]);  
  const [markedDays, setMarkedDay] = useState({});
  const [value, onChange] = useState(new Date()); 
  const [loading, setLoading] = useState(true)
  const [isMobile, setMobile] = useState(window.matchMedia("only screen and (max-width: 760px)").matches)
  const navigate = useNavigate();
  useEffect(() => { 
    const handleMobile = () => {
      setMobile(window.matchMedia("only screen and (max-width: 760px)").matches)
    };
    window.addEventListener('resize', handleMobile);
    console.log("Home")
    const finishedArr = []
    const arrDate = []
    let newMarkDate = {}
    getTripsFacility(userData.id).then((tripData) => { 
      tripData.forEach((ele) => {
        let data = ele.data();  
        setTripsData(oldArray => [...oldArray, data]);
      });   
      setLoading(false); 
    }).catch((err) => console.log(err)); 
  },[]);
 
  console.log(tripsData);
  return ( 

    <>
      {loading === false ? (
        <Container>
        <Row className="p-3">
            <Col md={6} className="p-3"> 
              <h3><BsPlusCircle className="me-3"/>Create New Trip</h3>
            </Col>
            <Col md={6} className="shadow rounded p-3"> 
              <label className="py-1 px-3">Amount Due</label> 
              <h2 className="py-1 px-3">$ 453.00</h2>
            </Col>
        </Row> 
        <Row className="p-3">
            <Col md={6} className="p-0"> 
              <Calendar onChange={onChange} value={value} className="shadow"/>
            </Col>
            <Col md={6} className="rounded mt-3"> 
              <h5  className={`${isMobile === false ? "p-3" : "py-1"}`}>Trip Activity : September 19th 2021</h5>
              {tripsData.filter((trip) => trip.trackingStatus !== "checkout").map((data, index) =>(
                <Row key={index} className={`${isMobile === false ? "p-3" : "py-3"}`}>
                    <div className="w-75">
                      <h5 className="tripHeader">Trip - {data.tripId.slice(0,8).toUpperCase()}</h5>
                      <Row>
                        <div className="w-50">
                          <label>From</label>
                          <h6>{data.tripInfo.dropOff}</h6>
                        </div>
                        <div className="w-50" sm={4}>
                          <label>To</label>
                          <h6>{data.tripInfo.desVal}</h6>
                        </div>
                      </Row>
                    </div>
                    <div className="text-end w-25">
                      <label className="status">{data.trackingStatus}</label>
                    </div>
                </Row> 
              ))}
            </Col>
        </Row> 
        </Container>
    ) : (
          <Loading />
        )}
      </>
  );
} 