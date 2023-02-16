import React from 'react';
import WardenHeader from '../../WardenHeader';
import { Container } from "react-bootstrap"
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../../util/useLocalStorage';
import {useNavigate} from 'react-router-dom';
import { Button, DataTable } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { Welcome } from '../../../admin/dashboard/style';
import { TableIconsWrapper, TableIconWrapper, Wrapper, Release } from '../../../admin/hostel/style';
import Block from '../../../admin/icons/Block.svg';
import { sortbyTime } from '../../../../util/util';


const ViewStudentRecords = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [hostelId, setHostelId] = useLocalState("", "hostelId");
    const[students,setStudents]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();

    useEffect(()=>{
      fetch(`/warden/viewHostelStudents/${hostelId}`,{
          method:"GET",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
          }, 
          })
          .then(response => Promise.all([response.json()]))
          .then(([body]) => {
              setStudents(sortbyTime(body));
              setHasLoaded(true);
           });
          
  },[]);

  const getstudentRecords = () => {
    if (!students || students.length === 0) {
      return;
    }

    return students.map((student) => {
      return [
        student.studentName || '-',
        student.email|| '-',
        student.studentRollNo|| '-',
        student.studentPhoneNo|| '-',
        student.studentGender|| '-',
        student.course.courseName|| '-',

        
        
      ];
    });
  };

    return (
        hasLoaded 
            ?
        <React.Fragment>
            <WardenHeader />
            <Wrapper>
            <center><h2>View Student Records</h2></center>
          <DataTable
            headers={[
              'Name',
              'Email',
              'Roll No',
              'Phone No',
              'Gender',
              'Course'
            ]}
            rows={getstudentRecords()}
            noData={'No Records found'}
            perPage={{
              label: '5',
              value: 5,
            }}
          />
        
      </Wrapper>
        
  </React.Fragment>
  : 
  <p>Loading...</p>
    )
}

export default ViewStudentRecords;