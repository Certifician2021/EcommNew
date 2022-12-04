import React from 'react';
import logo from '../logo.svg';
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';

 function Header() {
  let navigate = useNavigate();
  const [logIn, setLogIn] = useState(false)


  const loggedIn = auth.isLoggedIn()
console.log(loggedIn)

const userInfo = auth.getUserInfo()

  const logOut = () => {
       localStorage.clear();
       navigate('/')
       window.location.reload(false)

  }

  return(
    <header>
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-gray" style={{ height: 80 }}>
    
      <Container>
        <Row className="position-relative w-100 align-items-center">
        
          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>
              
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">Home</NavLink>
              </NavItem>
              
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">Electronics</NavLink>
              </NavItem>
              
              <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                <DropdownToggle className="font-weight-bold" nav caret>Fashion</DropdownToggle>
                <DropdownMenu >
                  <DropdownItem divider />
                  <DropdownItem>Men</DropdownItem>
                  <DropdownItem>Women</DropdownItem>
                  <DropdownItem>Baby and Kids</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              {
                !loggedIn ?  <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/app/signup">Register/LogIn</NavLink>
              </NavItem>:null
              }

             
              
            </Nav>
          </Col>
          
          <Col className="d-flex justify-content-xs-start justify-content-lg-center">
            <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
              <h2 className='logo'>FavShop.in</h2>
            </NavbarBrand>
          </Col>
          
          <Col className="d-none d-lg-flex justify-content-end">
            <Form className='d-lg-flex' inline>
              <Input type="search" className="mr-3" placeholder="Search Products" />&nbsp;
              <Button type="submit" color="info" outline>Search</Button>
            </Form>
          </Col>
        {loggedIn ? <Col style={{marginLeft:"-205px",marginRight:"-60px"}} className="d-none d-sm-flex justify-content-end">
          <UncontrolledDropdown className="d-flex align-items-center" nav style={{marginRight:"5px"}}>
                <DropdownToggle className="font-weight-bold" nav caret> <img src={AVATAR} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
               </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem divider />
                  <DropdownItem>My Profile</DropdownItem>
                  <DropdownItem onClick={logOut}>Logout</DropdownItem>
                </DropdownMenu>&nbsp;
                {userInfo.fullName.split(" ")[0]}
              </UncontrolledDropdown>
              
          </Col>:null}
          

             
          
        </Row>
      </Container>
      
    </Navbar>
  </header>
  )
  
  };

export default Header;