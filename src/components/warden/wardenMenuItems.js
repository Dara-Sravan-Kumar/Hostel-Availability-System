import React from 'react';
import './css/Style.css';

export const wardenMenuItems = [
    
    {
      title: 'Profile',
      url: '/warden/viewProfile',
      submenu: [
        
        {
          title: 'Edit Profile',
          url: '/warden/editWardenProfile',
        },
        {
          title: 'Update Password',
          url: '/warden/updatePassword',
        },
      ],
    },
    {
      title: 'Hostel',
      url: '/',
      displayHostel: true,
      submenu: [
        {
          title: 'Rooms',
          url: '/warden/viewRooms',
          
        },
        {
          title: 'Room Type',
          url: '/warden/viewRoomTypes',
          
        },
      ],
    },
    {
      title: 'Students',
      url: '/',
      displayHostel: true,
      submenu: [
        {
          title: 'View Records',
          url: '/warden/viewStudentRecords',
        },
        {
          title: 'Rooms',
          url: '',
          submenu: [
            {
              title: 'Allot Room Requests',
              url: '/warden/allotRoomRequests',
            },
            {
              title: 'Vacate Room Requests',
              url: '/warden/vacateRoomRequests',
            },
            {
              title: 'Allot Room',
              url: '/warden/allotRoom',
            },
            {
              title: 'Vacate Room',
              url: '/warden/vacateRoom',
            }
          ],
        },
      ],
    },
    {
      title: 'Logout',
      url: '/logout',
    },
  ];