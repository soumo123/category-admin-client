import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import profileImage from '../../../images/profile.png'
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import shopgo from '../../../images/shopgo.png'
import UserOptions from './UserOptions';
import '../../../css/header.css'
import '../../../Responsive.css'

const Header = () => {

  return (
    <>
<Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/"><h3 className="font-link">Shopgo.in</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
        <UserOptions/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
      </>
      
  )


};

export default Header;
