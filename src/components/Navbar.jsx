import React from "react";
import { NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCartArrowDown, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/userSlice";
import { toast } from "react-toastify";

function Header() {

  const {cartItems} = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  
  const {isAuthenticated} = useSelector((state) => state.userState);

  const handleLogout = ()=>{
    toast.success("User loggedout")
    dispatch(userLogout());
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/products'>Products</Nav.Link>
              <Nav.Link as={Link} to=''>Contact</Nav.Link>

            </Nav>
            <Nav className="ms-auto">
              {!isAuthenticated && (
                 <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              )}
             
              <Nav.Link as={Link} to='/cart' className="position-relative">
                <FaCartArrowDown size={20} />
                <span className="cart-count">
                  {cartItems.length}
                </span>
              </Nav.Link>
            {isAuthenticated && (
               <NavDropdown title={<FaRegUserCircle />} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/list-products">
                List Products
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/list-users">
                List Users
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} onClick={handleLogout} to="/login">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            ) }
             

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}
export default Header