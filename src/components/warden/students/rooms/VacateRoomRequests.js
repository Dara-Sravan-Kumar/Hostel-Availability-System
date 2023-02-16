import React from 'react';
import WardenHeader from '../../WardenHeader';
import { Container } from "react-bootstrap"
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import {useNavigate} from 'react-router-dom';

import { Button, DataTable,Snackbar} from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { Welcome } from '../../../admin/dashboard/style';
import { TableIconsWrapper, TableIconWrapper, Wrapper, Release } from '../../../admin/hostel/style';
import Block from '../../../admin/icons/Block.svg';
import { useLocalState } from '../../../../util/useLocalStorage';
import { sortbyTime } from '../../../../util/util';

const VacateRoomRequests = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [hostelId, setHostelId] = useLocalState("", "hostelId");
    const[vacateReqs,setVacateReqs]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    useEffect(()=>{
        fetch(`/warden/viewVacateRoomReq/${hostelId}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }, 
            })
            .then(response => Promise.all([response.json()]))
            .then(([body]) => {
                setVacateReqs(sortbyTime(body).reverse());
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
          window.location.href = "/warden/vacateRoomRequests";
         });
    }

    const getvaccateReq = () => {
      if (!vacateReqs) {
        return;
      }
  
      return vacateReqs.map((vacateReq) => {
        return [
          vacateReq.student.studentName|| '-',
          vacateReq.student.email|| '-',
          vacateReq.student.studentRollNo|| '-',
          
       <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => vacateRoom(vacateReq.student.studentId)}>
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
            <center><h2>Vaccate Room Requests</h2></center>
          <DataTable
            headers={[
              'Student Name',
              'Email',
              'Roll No',
              'Action',
              
            ]}
            rows={getvaccateReq()}
            noData={'No Request found'}
            perPage={{
              label: '5',
              value: 5,
            }}
          />
        
      </Wrapper>
      {snackbar && snackbar.message && (
          <Snackbar
            message={snackbar.message}
            variant={snackbar.variant}
            onClose={() => setSnackbar(null)}
          />
        )}
       
  </React.Fragment>
  : 
  <p>Loading...</p>
    )
}

export default VacateRoomRequests;

/* <Container>
      <div className="row text-center">
        <div className="col-sm-8 text-success text-center">
        <h5 className="p-3 fw-bold text-black text-center">
            Vacate Room Requests
          </h5>
        
          <table className="table table-bordered text-black text-center">
            <thead>
              <tr>   
                <th>Student Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {vacateReqs.map((vacateReq) => (
                  <tr key={vacateReq.currentStatusId}>
                    <td>{vacateReq.student.studentName}</td>
                    <td>
                      <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => vacateRoom(vacateReq.student.studentId)}>
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