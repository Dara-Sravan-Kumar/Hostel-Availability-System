import React from 'react';
import WardenNavbar from './WardenNavbar';
import './css/Style.css';
import Nav from 'react-bootstrap/Nav';
import { Link} from 'react-router-dom';
import {wardenMenuItems} from './wardenMenuItems'

const WardenHeader = () => {
  return (
    <div className='wardhead' style={{ background: '#37387a' }}>
      <div className="na">
      <Link to="/wardenDashboard" className="logo">
          Hostel Availability Project
        </Link>
        <Nav className='ms-auto'>
        
              <WardenNavbar menuItems={wardenMenuItems}/></Nav>
        
      </div>
    </div>
  );
};

export default WardenHeader;