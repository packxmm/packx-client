import React, {useEffect , useState} from 'react';
import { getTripData, logout, updateTrip, getUserData, getPackageData } from '../../firebase.js';
import { Container , Row, Nav, Col ,Table} from "react-bootstrap";
import { BiTrip , BiLogOut} from "react-icons/bi"; 
import { BsToggleOff , BsToggleOn} from "react-icons/bs";
import "./Dashboard.css";
import Loading from '../Loading/Loading';
import logo from "./../../assets/images/PackXLogo.png";

function Dashboard(){   
  const [loading, setLoading] = useState(true)
  const [tripData , setTripData] = useState([]);
  const [userData , setUserData] = useState([]); 

  useEffect(() => { 
    getUserData().then((users) => { 
      var arrUsers = [];
      users.forEach((ele) => {
        arrUsers.push(ele.data());
      });
      setUserData(arrUsers); 
    }).catch((err) => console.log(err));

    getPackageData().then((packages) => { 
      var arrPackages = [];
      packages.forEach((ele) => {
        arrPackages.push(ele.data());
      });
      console.log(arrPackages) 
      getTripData().then((lists) => {  
        lists.forEach((ele) => {
          const trip = ele.data();
          const currency = trip.categoryLists[0].currency;
          let total = 0;
          let convertTotal = 0;
          arrPackages.filter((data) => data.tripId === trip.tripId).map(packageItem => {
            if(packageItem.total !== undefined){
              total += packageItem.total 
            }
          });
          trip.totalAmount = total + " " + currency;
          if(currency !== "USD"){ 
            let reqUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/"+currency.toLowerCase()+".json";
            fetch(reqUrl)
              .then(response => response.json())
              .then(result => {
                let convertRate = total / result[currency.toLowerCase()]; 
                console.log(convertRate.toFixed(2))
                // convertTotal += parseFloat(convertRate.toFixed(2));
                trip.convAmount = convertRate.toFixed(2) + " USD";
                setTripData(oldArray => [...oldArray, trip]);
              })
              .catch(error => console.log('error', error));
          }else{ 
            convertTotal += total; 
            trip.convAmount = convertTotal + " USD";
            setTripData(oldArray => [...oldArray, trip]);
          }
          // arrTrips.push(trip); 
        }); 
        // setTripData(arrTrips);
        setLoading(false);
      }).catch((err) => console.log(err)); 
    }).catch((err) => console.log(err)); 
  }, []); 

  console.log(tripData)
  function paymentStatus(data){
    const gettripData = data.data;
    updateTrip(gettripData.tripId)
  } 
  return(
    <>
      {loading === false ? (
        <Container fluid>
            <Row>
              <Nav variant="pills" className="col-md-3 col-lg-2 d-md-block sidebar collapse" defaultActiveKey="/dashboard">
                <Nav.Item>
                <div className="text-center mb-3">
                    <img alt={logo} src={logo} className="logo"/>
                </div>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/dashboard"><BiTrip /> Trips</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/" onClick={logout}><BiLogOut />Sign Out</Nav.Link>
                </Nav.Item>
              </Nav>
              <Col lg={10} md={9} className="ms-sm-auto">
                <Container>
                  <Row className="flex-nowrap justify-content-between">
                    <Col md={2}>
                      <h5 className='py-3 px-4'>All Trips</h5>
                    </Col>
                    <Col md={3} className="d-flex align-items-center justify-content-end">
                      {/* <Button variant="primary"  onClick={() => setShowModal(true)}>Create Book</Button> */}
                      {/* <BookModal show={showModal} close={() => setShowModal(false)} status={status} book={bookInfo}/> */}
                    </Col>
                  </Row>
                </Container>
                <Container className='trip-container p-0'>
                  <Table hover>
                    <thead>
                      <tr className='table-header'> 
                        <th className='px-3'>No. </th>
                        <th>Facility </th>
                        {/* <th>Trip </th> */}
                        <th>From</th>
                        <th>To</th>
                        <th>Trip Status</th>
                        <th>Total Amount</th>
                        <th>Due Amount</th>
                        <th className='px-3'>Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                        {tripData.map((data, index) =>(
                          <tr key={index} className="bookRow">
                            <td className='px-3'><label>{index+1}.</label></td>
                            {userData.filter((userdata) => userdata.id === data.facilityId).map((user) => (
                              <td className='col-md-1'><label>{user.fullName}</label></td>
                            ))}
                            {/* <td className='col-md-2'><label>{data.tripId.slice(0,8).toUpperCase()}</label></td>  */}
                            <td className='col-md-2'>
                              <label>{data.tripInfo.dropOff}</label>
                              {/* <p>{data.tripInfo.dropOffAddress}</p>*/}
                              <p> <label>Drop off : </label> {data.tripInfo.dropOffDate}</p> 
                            </td>
                            <td className='col-md-2'>
                              <label>{data.tripInfo.desVal}</label> 
                              {/* <p>{data.tripInfo.pickUpAddress}</p>*/}
                              <p><label>Pick Up : </label> {data.tripInfo.pickUpDate}</p> 
                            </td>
                            <td className='col-md-2'><label>{data.trackingStatus}</label></td>
                            <td className='col-md-2'><label>{data.totalAmount}</label></td>
                            <td className='col-md-2'><label>{data.convAmount}</label></td>
                            {data.trackingStatus !== "Done" ? ( 
                              <td className='icon px-3'> <BsToggleOff onClick={() => paymentStatus({data})}/></td>
                            ) : ( 
                              <td className='icon px-3'> <BsToggleOn /></td>
                            )}
                          </tr>
                      ))}
                    </tbody>
                  </Table>
                </Container>
              </Col>
            </Row>
        </Container> 
    ) : (
          <Loading />
        )}
      </>
  );
}
export default Dashboard;