import React from 'react';
import WardenHeader from '../../WardenHeader';
import { Container } from "react-bootstrap"
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../../util/useLocalStorage';
//import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import { AddRoomType } from '../../../admin/hostel/style';
import { Button, DataTable } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { Welcome } from '../../../admin/dashboard/style';
import { TableIconsWrapper, TableIconWrapper, Wrapper, Release } from '../../../admin/hostel/style';
import Block from '../../../admin/icons/Block.svg';

import { Snackbar } from '@blotoutio/ui-kit';
import { sortbyTime } from '../../../../util/util';


const ViewRoomTypes = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const[roomTypes,setRoomTypes]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });
    
    useEffect(()=>{
        fetch('/warden/viewRoomTypes',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }, 
            })
            .then(response => Promise.all([response.json()]))
            .then(([body]) => {
                setRoomTypes(sortbyTime(body));
                setHasLoaded(true);
             });
            
    },[]);

    const[roomTypeStatus,setRoomTypeStatus]=useState();
    const navigate = useNavigate(); 
    const sendEditRoomTypeRequest = (roomTypeId) => {

      fetch(`/warden/checkRoomType/${roomTypeId}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }, 
        })
        .then(response => Promise.all([response.text()]))
        .then(([body]) => {
          if(!(body === "true")) {
           // alert("Can't edit Room Type, In Use");
           setSnackbar({
            message:("Can't edit Room Type, In Use"),
            variant: 'error',
          });
            return;
          }
            navigate("/warden/editRoomType", {state:{id:roomTypeId}});
         });
    }

    const sendRemoveRoomTypeRequest = (roomTypeId) => {

      fetch(`/warden/removeRoomType/${roomTypeId}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }, 
        })
        .then(response => Promise.all([response.text()]))
        .then(([body]) => {
         // alert(body);
         setSnackbar({
          message:(body),
          variant: 'success',
        });
        window.location.href = "/warden/viewRoomTypes";
         });
    }

    const getroomTypeData = () => {
      if (!roomTypes) {
        return;
      }
  
      return roomTypes.map((roomType) => {
        return [
          roomType.roomName || '-',
         roomType.roomFee || '-',
          roomType.roomCapacity || '-',
          
          <TableIconsWrapper>
            <TableIconWrapper
              onClick={() => {
                sendEditRoomTypeRequest(roomType.roomTypeId)
              }}
              //isDisabled={loading}
              title={'Edit roomType'}
            >
              <Edit />
            </TableIconWrapper>
            <TableIconWrapper
            className={'trash'}
            onClick={() => {
              sendRemoveRoomTypeRequest(roomType.roomTypeId)
            }}
            //isDisabled={loading}
            title={'Delete Room Type'}
          >
            <Trash />
          </TableIconWrapper>
          </TableIconsWrapper>,
        ];
      });
    };
  

    return (
        hasLoaded 
            ?
        <React.Fragment>
            <WardenHeader />
            
            <Wrapper>
            <center><h2>Available Room Types</h2></center>
            <AddRoomType >
                <Button color='secondary' onClick={() => navigate('/warden/addRoomType')}>+ Add</Button>
            </AddRoomType>
          <DataTable
            headers={[
              'Room Type',
              'Room Fee',
              'Room Capacity',
              'Actions',
            ]}
            rows={getroomTypeData()}
            noData={'No Rooms found'}
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

export default ViewRoomTypes;

/*<table className="table table-bordered text-black text-center">
            <thead>
              <tr>   
                <th>Room Type</th>
                <th>Room Fee</th>
                <th>Room Capacity</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {roomTypes.map((roomType) => (
                  <tr key={roomType.roomTypeId}>
                    <td>{roomType.roomName}</td>
                    <td>{roomType.roomFee}</td>
                    <td>{roomType.roomCapacity}</td>
                    <td>
                      <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => sendEditRoomTypeRequest(roomType.roomTypeId)}>
                           Edit Room Type
                       </Button>
                    </td>
                    <td>
                      <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={() => sendRemoveRoomTypeRequest(roomType.roomTypeId)}>
                           Remove Room Type
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table> */