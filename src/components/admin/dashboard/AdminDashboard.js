import React from 'react';
import AdminNavbar from '../navbar/AdminNavbar';
import { adminMenuItems } from './data';
import { Welcome } from './style';

const AdminDashboard = ({ children }) => {
  return (
    <div>
      <AdminNavbar menuItems={adminMenuItems} />
      {children ? children : <Welcome>Welcome Admin</Welcome>}
    </div>
  );
};

export default AdminDashboard;
