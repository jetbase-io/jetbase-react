import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Sidebar = () => (
  <Nav vertical className="col-md-2 d-none d-md-block bg-light sidebar">
    <NavItem>
      <NavLink href="/#/">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/users">Users</NavLink>
    </NavItem>
  </Nav>
);

export default Sidebar;
