import React from 'react';
import {
  Nav,
  Navbar as NavbarBootstrap,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

const Navbar = () => (
  <NavbarBootstrap>
    <NavbarBootstrap.Header>
      <NavbarBootstrap.Brand>
        <a href="#brand">
          <img src="https://cdn1.iconfinder.com/data/icons/business-sets/512/612394-mic-24.png" alt="Karaoke shower icon"/>
        </a>
      </NavbarBootstrap.Brand>
      <NavbarBootstrap.Toggle />
    </NavbarBootstrap.Header>
    <NavbarBootstrap.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">
          Link
        </NavItem>
        <NavItem eventKey={2} href="#">
          Link
        </NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Link Right
        </NavItem>
        <NavItem eventKey={2} href="#">
          Link Right
        </NavItem>
      </Nav>
    </NavbarBootstrap.Collapse>
  </NavbarBootstrap>
);

export default Navbar;
