import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './AuthButtons';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {/* PLACEHOLDER: render a navigation link to the about page */}
        <NavItem className='p-3'><Link to="/about" className="nav-link">About</Link></NavItem>
        <NavItem className='p-3'><Link to="/profile" className="nav-link">Profile</Link></NavItem>
        <NavItem className='p-3'><AuthButtons /></NavItem>
      </Navbar>
    );
  }
}

export default Header;
