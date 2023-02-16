import React from 'react';
import Pricing from './Pricing';
import StudentHeader from './StudentHeader';
import Studenthomepagefile from './Studenthomepagefile';


const StudentDashboard = () => {
  
  return (
    <React.Fragment>
      <StudentHeader />
     <Studenthomepagefile/>
      <Pricing/>
    
    </React.Fragment>
  )
}

export default StudentDashboard;