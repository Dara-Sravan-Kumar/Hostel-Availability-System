import React from 'react';
import WardenHeader from '../../WardenHeader';
import { Container } from "react-bootstrap"
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../../util/useLocalStorage';
import {useNavigate} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import './RoomPage.css'
import { AddRoomType } from '../../../admin/hostel/style';
import { Button, DataTable } from '@blotoutio/ui-kit';
import { Edit, Trash } from '@blotoutio/ui-kit/icons';
import { Welcome } from '../../../admin/dashboard/style';
import { TableIconsWrapper, TableIconWrapper, Wrapper, Release } from '../../../admin/hostel/style';
import Block from '../../../admin/icons/Block.svg';
import { Snackbar } from '@blotoutio/ui-kit';
import { sortbyTime } from '../../../../util/util';


const ViewRooms = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [hostelId, setHostelId] = useLocalState("", "hostelId");
    const[rooms,setRooms]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    useEffect(()=>{
        fetch(`/warden/viewRooms/${hostelId}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }, 
            })
            .then(response => Promise.all([response.json()]))
            .then(([body]) => {
                setRooms(sortbyTime(body));
                setHasLoaded(true);
             });
    },[]);

    const navigate = useNavigate(); 
    const sendEditRoomRequest = (roomId, roomNo, bedsOccupied) => {
      if(bedsOccupied > 0) {
        //alert("Can't edit Room");
        setSnackbar({
          message: "Can't edit Room",
          variant: 'warning',
        });

        return;
      }
      navigate("/warden/editRoom", {state:{id:roomId ,no:roomNo}});  
    }

    const getroomData = () => {
      if (!rooms) {
        return;
      }
  
      return rooms.map((room) => {
        return [
          String(room.roomNo) || '-',
          room.roomStatus || '-',
          room.bedsOccupied ?? '-',
          room.roomType.roomName || '-',
          room.roomType.roomFee || '-',
          room.roomType.roomCapacity || '-',
          //roomType.roomType.roomTypeId || '-',
          //roomType.roomType.roomName || '-',
         // roomType.roomType.roomFee || '-',
          //roomType.roomType.roomCapacity || '-',
          
          <TableIconsWrapper>
            <TableIconWrapper
              onClick={() => {
                sendEditRoomRequest(room.roomId, room.roomNo, room.bedsOccupied)
              }}
              //isDisabled={loading}
              title={'Edit roomType'}
            >
              <Edit />
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
            <center><h2>Available Rooms </h2></center>
            <AddRoomType>
                <Button color='secondary' onClick={() => navigate('/warden/AddRoom')}>+ Add Room</Button>
            </AddRoomType>
          <DataTable
            headers={[
              'Room No',
              'Room Status',
              'Beds Occupied',
              'Room Type',
              'Room Fee',
              'Room Capacity',
              'Actions',
            ]}
            rows={getroomData()}
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

export default ViewRooms;