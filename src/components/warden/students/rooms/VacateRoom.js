import React from 'react';
import WardenHeader from '../../WardenHeader';
import { Container } from "react-bootstrap"
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../../util/useLocalStorage';
import {useNavigate} from 'react-router-dom';
import { Button, DataTable, Snackbar } from '@blotoutio/ui-kit';
import { TableIconsWrapper, TableIconWrapper, Wrapper, Release } from '../../../admin/hostel/style';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { Welcome } from '../../../admin/dashboard/style';

import Block from '../../../admin/icons/Block.svg';
import { sortbyTime } from '../../../../util/util';

const VacateRoom = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [hostelId, setHostelId] = useLocalState("", "hostelId");
    const[students,setStudents]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    useEffect(()=>{
        fetch(`/warden/viewVacateHostelStudents/${hostelId}`,{
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

    const vacateRoom = (studentId) => {

        fetch(`/warden/vacateRoom/${studentId}`,{
          method:"DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
          }, 
          })
          .then(response => Promise.all([response.text()]))
          .then(([body]) => {
            //alert(body);
            setSnackbar({
              message: body,
              variant: 'success',
            });
      
            window.location.href = "/warden/vacateRoom";
           });
      }

      const getvacateroom = () => {
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
       
            
            <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => vacateRoom(student.studentId)}>
                           Vacate Room
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
            <center><h2>Vaccate Room</h2></center>
          <DataTable
            headers={[
              'Name',
              'Email',
              'Roll No',
              'Phone No',
              'Gender',
              'Course',
              'Action'
            ]}
            rows={getvacateroom()}
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

export default VacateRoom;

/**<Container>
      <div className="row text-center">
        <div className="col-sm-8 text-success text-center">
        <h5 className="p-3 fw-bold text-black text-center">
            Students
          </h5>
          <table className="table table-bordered text-black text-center">
            <thead>
              <tr>   
                <th>Name</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Phone No</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                  <tr key={student.studentId}>
                    <td>{student.studentName}</td>
                    <td>{student.email}</td>
                    <td>{student.studentRollNo}</td>
                    <td>{student.studentPhoneNo}</td>
                    <td>{student.studentGender}</td>
                    <td></td>
                    <td>
                      <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => vacateRoom(student.studentId)}>
                           Vacate Room
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>      
    </Container> */