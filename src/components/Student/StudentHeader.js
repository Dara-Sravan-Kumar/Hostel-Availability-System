import React from 'react';
import '../warden/css/Style.css';
import Nav from 'react-bootstrap/Nav';
import { Link} from 'react-router-dom';
import WardenNavbar from '../warden/WardenNavbar';
import { studentMenuItems } from './studentMenuItems';

const StudentHeader = () => {
  return (
    <div className='wardhead' style={{ background: '#37387a' }}>
      <div className="na">
      <Link to="/studentDashboard" className="logo">
          Hostel Availability Project
        </Link>
        <Nav className='ms-auto'>
        
              <WardenNavbar menuItems={studentMenuItems}/></Nav>
        
      </div>
    </div>
  );
};

export default StudentHeader;