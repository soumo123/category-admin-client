import React from 'react'
import { Link } from "react-router-dom";
// import '../../css/home.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bootstrap from "../../css/bootstrap.css";
import { Container } from '@material-ui/core';

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <h2 className="mt-5 text-center">Sellers Dashboard Portal</h2>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Link to="/login">
              <div className=" login-button text-center mt-5">
                <button type="button" className="btn btn-primary">Please login or Register</button>
              </div>
            </Link>
          </Col>
        </Row>


          <Row>
          <Col sm={12}>
           <div className="mt-5 mb-5"></div>
          </Col>
        </Row>







      </Container>


    </>
  )
}

export default Home