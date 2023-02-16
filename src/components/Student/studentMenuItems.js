import React from 'react';
import '../warden/css/Style.css';

export const studentMenuItems = [
    
    {
      title: 'Profile',
      url: '',
      submenu: [
        
        {
          title: 'Edit Profile',
          url: '/Student/studentEdit',
        },
        {
          title: 'Update Password',
          url: '/Student/UpdatePassword',
        },
      ],
    },
    {
      title: 'Logout',
      url: '/logout',
    },
  ];