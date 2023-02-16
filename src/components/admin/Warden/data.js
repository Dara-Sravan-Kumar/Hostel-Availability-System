export const hostelTypes = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export const hostelStatuses = [
  { label: 'Normal', value: 'UnBlocked' },
  { label: 'Blocked', value: 'Blocked' },
];
export const addWardenInit = {
  
  wardenName: '',
  email: '',
  wardenPhoneNo:'',
  password:'',
  hostel: 'no-warden',
  newHostel: {
    hostelName: '',
    hostelType: hostelTypes[0],
    hostelStatus: hostelStatuses[0],
    hostelRooms: '0',
  },

  notValid: {
    wardenName: '',
    email: '',
    wardenPhoneNo:'',
    password:'',
    hostel: '',
    newHostel: {
      hostelName: '',
      hostelType: '',
      hostelStatus: '',
      hostelRooms: '',
    },
  },
};
