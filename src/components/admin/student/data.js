export const genders = [
  {
    label: 'Male',
    value: 'Male'
  },
  {
    label: 'Female',
    value: 'Female'
  }
]

export const addStudentInit = {
  
    studentName: '',
    email: '',
    studentRollNo: '',
    studentPhoneNo: '',
    studentGender: genders[0],
    course: '',
    password:'',
    notValid: {
      studentName: '',
      email: '',
      studentRollNo: '',
      studentPhoneNo: '',
      studentGender: '',
      course: '',
      password:''
    },
  };
  