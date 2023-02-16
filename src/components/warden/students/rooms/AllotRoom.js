import React from 'react';
import WardenHeader from '../../WardenHeader';
import { Container } from "react-bootstrap"
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../../util/useLocalStorage';
import {useNavigate} from 'react-router-dom';
import { Button, DataTable,Snackbar } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { Welcome } from '../../../admin/dashboard/style';
import { TableIconsWrapper, TableIconWrapper, Wrapper, Release } from '../../../admin/hostel/style';
import Block from '../../../admin/icons/Block.svg';
import { sortbyTime } from '../../../../util/util';

const AllotRoom = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const[students,setStudents]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    useEffect(()=>{

        fetch(`/warden/viewNonHostelStudents`,{
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

    const navigate = useNavigate();
    const allotRoom = (studentId) => { 
        navigate("/warden/allotRoomHelper", {state:{id:studentId}});
      }

      const getallotroom = () => {
        if (!students) {
          return;
        }
    
        return students.map((student) => {
          return [
            student.studentName || '-',
            student.email || '-',
            student.studentRollNo || '-',
            student.studentPhoneNo || '-',
            student.studentGender || '-',
            student.course.courseName|| '-',
       
            
            <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => allotRoom(student.studentId)}>
            Allot Room
        </Button>
          ];
        });
      };



    return (
        hasLoaded 
            ?
        <React.Fragment>
            <WardenHeader />
        
            <Wrapper>
            <center><h2>Allot Room</h2></center>
          <DataTable
            headers={[
              'Name',
              'Email',
              'Roll No',
              'Phone No',
              'Gender',
              'Course',
              'Actions'
            ]}
            rows={getallotroom()}
            noData={'No Records found'}
            perPage={{
              label: '5',
              value: 5,
            }}
          />
           {snackbar && snackbar.message && (
    <Snackbar
      message={snackbar.message}
      variant={snackbar.variant}
      onClose={() => setSnackbar(null)}
    />
  )}
  
        
      </Wrapper>
  </React.Fragment>
  : 
  <p>Loading...</p>
    )
}

export default AllotRoom;