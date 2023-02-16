export const hostelTypes = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export const hostelStatuses = [
  { label: 'Normal', value: 'UnBlocked' },
  { label: 'Blocked', value: 'Blocked' },
];
export const addHostelInit = {

  
  hostelName: '',
  hostelType: hostelTypes[0],
  hostelStatus: hostelStatuses[0],
  hostelRooms: '0',
  warden: undefined,
  newWarden: {
    email: '',
    phone: '',
    name: '',
    password: '',
  },
  notValid: {
    hostelName: '',
    hostelType: "",
    hostelStatus: "",
    hostelRooms: '',
    warden: '',
    newWarden: {
      email: '',
      phone: '',
      name: '',
      password: '',
    },
  },
};
