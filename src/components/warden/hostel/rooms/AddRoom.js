import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import WardenHeader from '../../WardenHeader';
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../../util/useLocalStorage';
import { Snackbar } from '@blotoutio/ui-kit';
import {Wrapper} from '../../../admin/hostel/style';

const AddRoom = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userEmail, setUserEmail] = useLocalState("", "userEmail");
    const [snackbar, setSnackbar] = useState({
        variant: 'success',
        message: '',
      });
    const [hostelId, setHostelId] = useLocalState("", "hostelId");
    const [roomNo, setRoomNo] = useState("");
    const [roomType, setRoomType] = useState("⬇️ Select a Room Type ⬇️");
    let handleRoomTypeChange = (e) => {
        setRoomType(e.target.value)
      }

    const[roomTypes,setRoomTypes]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [roomlenError, setRoomlenError] = useState(false);
    const [roomnoError, setRoomnoError] = useState(false);
    const [roomtypeError, setRoomTypeError] = useState(false);
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
                setRoomTypes(body);
                setHasLoaded(true);
             });
            
    },[]);

    function sendNewRoomRequest () {
        if(roomNo.length>=5){
            setRoomlenError(true);
            setRoomnoError(false);
            return;
        }
        if(roomType === "⬇️ Select a Room Type ⬇️" && roomNo === "") {
            //alert("Select Room Type and Room No");
            setRoomlenError(false);
            setRoomnoError(true);
            setRoomTypeError(true);

            
            return;
        }else if( roomNo === "") {
            //alert("Select Room Type and Room No");
            setRoomlenError(false);
            setRoomnoError(true);
            setRoomTypeError(false);
           
            return;
        }else if(roomType === "⬇️ Select a Room Type ⬇️" ) {
            //alert("Select Room Type and Room No");
            setRoomlenError(false);
            setRoomnoError(false);
            setRoomTypeError(true);
            
            return;
        }


        

        fetch(`/warden/addRoom/${roomNo}, ${roomType}, ${hostelId}`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }, 
        })
        .then((response) => {
          if (response.status === 200)
            return Promise.all([response.status, response.text()]);
            else {
                setRoomlenError(false);
                return Promise.reject("Invalid Update Details attempt");
            }
        })
        .then(([status, body]) => {
           // alert(body);
           setSnackbar({
            message: body,
            variant: 'success',
          });
          setRoomlenError(false);
          window.location.href = "/warden/viewRooms";
        })
        .catch((message) => {
          //alert(message);
          setSnackbar({
            message: message,
            variant: 'success',
          });
        });
    }

    return (
        hasLoaded 
            ?
        <>
            <WardenHeader />
            <Wrapper>
            <div class=" shadow mb-5 bg-white rounded">
               
                    <div class="container-fluid">
                      
                     <form>
                        <div class="form-group mb-3">
                        <h5 className='mb-3'><b>Add New Room</b></h5>
                            <label for="exampleFormControlInput1">Room No</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Room No"  value={roomNo} 
                                onChange = {(e) => setRoomNo(e.target.value)} />
                                {roomlenError && <span style={{color: 'red'}}> <p>Room Length should be less than 6</p></span>}
                                {roomnoError && <span style={{color: 'red'}}> <p>Room No should not be empty</p></span>}
                           
                              
                        </div>
                         <div class="form-group mb-3">
                             <label for="exampleFormControlSelect1">Select Room Type</label>
                            <select class="form-control" id="exampleFormControlSelect1" onChange={handleRoomTypeChange}> 
                            <option value="⬇️ Select a Room Type ⬇️"> -- Select a Room Type -- </option>
                                 {roomTypes.map(type => (
                                    <option key={type.roomTypeId} value= {type.roomTypeId}> 
                                        Room Name - {type.roomName},
                                        Room Fee - {type.roomFee}, 
                                        Room Capacity - {type.roomCapacity}
                                        
                                    </option>
                                ))}
                            </select>
                            {roomtypeError && <span style={{color: 'red'}}> <p>Room Type should not be empty</p></span>}
                           
    
                        </div>
                        <div className='mb-3'>
                    <center>   <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "#37387a" }} type="button" onClick={() => sendNewRoomRequest()}>
                           Add New Room
                       </Button></center> 
                        </div>
                        
 
</form>
</div>
           </div>             
                   
            
            {snackbar && snackbar.message && (
          <Snackbar
            message={snackbar.message}
            variant={snackbar.variant}
            onClose={() => setSnackbar(null)}
          />
        )}
      </Wrapper>
             </>
             : 
             <p>Loading...</p>
    )
}

export default AddRoom;

