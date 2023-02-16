import React from 'react';
import WardenHeader from '../../WardenHeader';
import { Container } from "react-bootstrap"
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import {useNavigate} from 'react-router-dom';

import { Button, DataTable,Snackbar } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { Welcome } from '../../../admin/dashboard/style';
import { TableIconsWrapper, TableIconWrapper, Wrapper, Release } from '../../../admin/hostel/style';
import Block from '../../../admin/icons/Block.svg';
import { useLocalState } from '../../../../util/useLocalStorage';
import { sortbyTime } from '../../../../util/util';

const AllotRoomRequests = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [hostelId, setHostelId] = useLocalState("", "hostelId");
    const[roomReqs,setRoomReqs]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    useEffect(()=>{
        fetch(`/warden/viewAllotRoomReq/${hostelId}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }, 
            })
            .then(response => Promise.all([response.json()]))
            .then(([body]) => {
                setRoomReqs(sortbyTime(body).reverse());
                setHasLoaded(true);
             })
            
    },[]);

    const allotRoom = (studentId,studentName, studentPhoneNo,reqId) => {

      fetch(`/warden/allotRoom/${studentId}`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }, 
        })
        .then(response => Promise.all([response.text(),response.status]))
        .then(([body, status]) => {
          //alert(body);
          if (status===200){
            setSnackbar({
              message: body,
              variant: 'success',
              
            });
            window.location.href = "/warden/allotRoomRequests";
          }
          else{ fetch(`/warden/removeRoomReq/${reqId},${studentName},${studentPhoneNo}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }, 
            }).then(response => Promise.all([response.text(),response.status]))
            .then(([body, status]) => {
              //alert(body);
                setSnackbar({
                  message: body,
                  variant: 'success',
                  
                });
                window.location.href = "/warden/allotRoomRequests";
              }
            )
          }

         });
    }

    const getroomReq = () => {
      if (!roomReqs) {
        return;
      }
  
      return roomReqs.map((roomReq) => {
        return [
          roomReq.student.studentName|| '-',
          roomReq.student.email|| '-',
          roomReq.student.studentRollNo|| '-',
          
     <center>     <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => allotRoom(roomReq.student.studentId,roomReq.student.studentName,roomReq.student.studentPhoneNo,roomReq.reqId)}>
                           Allot Room
                       </Button></center>  
         
        ];
      });
    };


    return (
        hasLoaded 
            ?
        <React.Fragment>
            <WardenHeader />
            <Wrapper>
            <center><h2>Allot Room Requests</h2></center>
          <DataTable
            headers={[
              'Student Name',
              'Email',
              'Roll No',
              'Action',
            ]}
            rows={getroomReq()}
            noData={'No Rooms found'}
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

export default AllotRoomRequests;

/**<Container>
      <div className="row text-center">
        <div className="col-sm-8 text-success text-center">
        <h5 className="p-3 fw-bold text-black text-center">
            Allot Room Requests
          </h5>
        
          <table className="table table-bordered text-black text-center">
            <thead>
              <tr>   
                <th>Student Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {roomReqs.map((roomReq) => (
                  <tr key={roomReq.reqId}>
                    <td>{roomReq.student.studentName}</td>
                    <td>
                      <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => allotRoom(roomReq.student.studentId)}>
                           Allot Room
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>      
    </Container> */