import React, {useEffect , useState} from 'react';
import { getTripData, logout, updateTrip } from '../../firebase.js';
import { Container , Row, Nav, Col ,Table , Button} from "react-bootstrap";
import { BiTrip , BiLogOut} from "react-icons/bi"; 
import { BsToggleOff , BsToggleOn} from "react-icons/bs";
import "./Dashboard.css";
import Loading from '../Loading/Loading';
import logo from "./../../assets/images/PackXLogo.png";

function Dashboard(){  
  // const { bookdata } = GetBookLists(); 
  const [loading, setLoading] = useState(true)
  const [bookdata , getData] = useState([]);

  useEffect(() => {
    getTripData().then((lists) => {
      console.log("Dashboard")
      console.log(lists.docs)
      var arrBook = [];
      lists.forEach((ele) => {
        arrBook.push(ele.data());
      });
      getData(arrBook);
      setLoading(false);
    }).catch((err) => console.log(err));
  }, []); 

  function paymentStatus(data){
    const tripData = data.data;
    updateTrip(tripData.tripId)
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
                        <th>TRIP </th>
                        <th>From</th>
                        <th>To</th>
                        <th>Tracking Status</th>
                        <th className='px-3'>Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                        {bookdata.map((data, index) =>(
                          <tr key={index} className="bookRow">
                            <td className='px-3'><label>{index+1}.</label></td>
                            <td className='col-md-1'><label>{data.tripId.slice(0,8).toUpperCase()}</label></td>
                            <td className='col-md-4'>
                              <label>{data.tripInfo.dropOff}</label>
                              <p>{data.tripInfo.dropOffAddress}</p>
                              <p> <label>Drop off : </label> {data.tripInfo.dropOffDate}</p>
                            </td>
                            <td className='col-md-4'>
                              <label>{data.tripInfo.desVal}</label> 
                              <p>{data.tripInfo.pickUpAddress}</p>
                              <p><label>Pick Up : </label> {data.tripInfo.pickUpDate}</p>
                            </td>
                            <td className='col-md-2'><label>{data.trackingStatus}</label></td>
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