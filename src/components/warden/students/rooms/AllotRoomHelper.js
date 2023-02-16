import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useLocalState } from "../../../../util/useLocalStorage";
import WardenHeader from "../../WardenHeader";
import {useLocation} from 'react-router-dom';
import {Wrapper } from '../../../admin/hostel/style';
import { Button, DataTable,Snackbar } from '@blotoutio/ui-kit';

const AllotRoomHelper = () => {
    
  const location = useLocation();
  const [buttonText, setButtonText] = useState('Allot');
  
  const [jwt, setJwt] = useLocalState("", "jwt");
  const[rooms,setRooms]=useState([]);
  const [hasLoaded, setHasLoaded] = useState();
  const [hostelId, setHostelId] = useLocalState("", "hostelId");
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });

  useEffect(()=>{
    fetch(`/warden/viewRoomTypesByHostelId/${hostelId}`,{
        method:"GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
          })
          .then(res=>res.json())
          .then((result)=>{
            setRooms(result);
            setHasLoaded(true);
            }
          )
        
},[]);


function allotRoomDirectly(roomTypeId){
    fetch(`/warden/allotRoomDirectly/${hostelId}, ${roomTypeId}, ${location.state.id}`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }, 
        })
        .then(response => Promise.all([response.text()]))
        .then(([body]) => {

          setSnackbar({
            message: body,
            variant: 'success',
          });

          window.location.href = "/warden/allotRoom";
         
         });

}

const getRoomTypes = () => {
  if (!rooms) {
    return;
  }

  return rooms.map((roomType) => {
    return [
      roomType.roomName || '-',
      roomType.roomFee || '-',
      roomType.roomCapacity || '-',
 
      
      <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={()=>allotRoomDirectly(roomType.roomTypeId)}>
            Allot
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
        'Room Name',
        'Room Fee',
        'Room Capacity',
        'Actions'
      ]}
      rows={getRoomTypes()}
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

export default AllotRoomHelper;