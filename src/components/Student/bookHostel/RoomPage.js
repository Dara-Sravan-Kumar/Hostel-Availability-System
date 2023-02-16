import { Container } from "react-bootstrap"
import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'
import '../css/RoomPage.css';
import { useLocalState } from "../../../util/useLocalStorage";
import StudentHeader from "../StudentHeader";
import { Button, DataTable,Snackbar } from '@blotoutio/ui-kit';
import {Wrapper} from '../../admin/hostel/style';

const RoomPage = () => {
  const [buttonText, setButtonText] = useState('Request');
  const [snackbar, setSnackbar] = useState({
    variant: 'success',
    message: '',
  });

  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userEmail, setUserEmail] = useLocalState("", "userEmail");
  const [gender, setGender] = useLocalState("", "gender");
  const[rooms,setRooms]=useState([]);
  const [hasLoaded, setHasLoaded] = useState();
  const [hasHostelLoaded, setHasHostelLoaded] = useState();
  
  const[hostels,setHostels]=useState([]);
  useEffect(()=>{
      fetch(`/student/genderHostelView/${gender}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }, 
        })
        .then(response => Promise.all([response.json()]))
        .then(([body]) => {
          setHostels(body);
          setHasLoaded(true);
        });
  },[]);

  const[hostelId,setHostelId]=useState([]);
  let handleHostelSelectChange = (e) => {
    if (e.target.value !== "⬇️ Select a Hostel ⬇️") {
      fetch(`/student/viewRoomType/${e.target.value}`,{
        method:"GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
          })
          .then(res=>res.json())
          .then((result)=>{
            setRooms(result);
            setHostelId(e.target.value);
            setHasHostelLoaded(true);
            }
          )
    }
  }


function roomrequestfunc(roomTypeId){

      fetch(`/student/roomReq/${roomTypeId}?studentEmail=${userEmail}&hostelId=${hostelId}`,{
        method:"POST",
        headers:{'Authorization':`Bearer ${jwt}`
    }}
    )
    .then((response) => {
      if (response.status === 200)
        return Promise.all([response.status, response.text()]);
        else {
            return Promise.reject("Invalid Update Details attempt");
        }
    })
    .then(([status, body]) => {
        //alert(body);
        window.location.href = "/studentDashboard";
        setSnackbar({
          message: body,
          variant: 'success',
        });

    }
    )
    .catch((message) => {
      //alert(message);
      setSnackbar({
        message: message,
        variant: 'success',
      });

    });
    // navigate('/studentDashboard');
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
 
      
      <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "rgb(13, 88, 100)" }} type="button" onClick={()=>roomrequestfunc(roomType.roomTypeId)}>
            Request
      </Button>
    ];
  });
};

  return (
    hasLoaded
    ?
    <React.Fragment>
        <StudentHeader />
        <Wrapper>
    <center>   <h3> 
          Select Hostel 
          </h3>
          <p>
          <select onClick={handleHostelSelectChange}> 
            <option value="⬇️ Select a Hostel ⬇️"> Select a Hostel Name</option>
              {hostels.map(hostel => (
                  <option key={hostel.hostelId} value= {hostel.hostelId}> 
                      Hostel Name - {hostel.hostelName}
                  </option>
              ))}
          </select>
          </p>
        </center> 

        <div style={{minHeight:"70vh"}}>
    <Container>
    { hasHostelLoaded
    ?
    <div className="container">
    <h1 className="title">Types of Room Available</h1>
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
  </div>  
  :
  <p> <b> Select a hostel to view Room Types </b> </p>  }
  
</Container>
</div>
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

export default RoomPage;