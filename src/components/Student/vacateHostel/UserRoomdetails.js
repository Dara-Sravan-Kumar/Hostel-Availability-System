import {React} from 'react'
import { Link} from "react-router-dom";
import { useLocalState } from '../../../util/useLocalStorage';
import {useLocation} from 'react-router-dom';
import {useEffect,useState } from "react";
import StudentHeader from '../StudentHeader';
import { Wrapper } from '../../admin/hostel/style';

import {Snackbar } from '@blotoutio/ui-kit';


const UserRoomdetails = () => {

    const location = useLocation();
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    const [buttonText, setButtonText] = useState("Vaccate Room");
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [hasLoaded, setHasLoaded] = useState();
    const [room, setRoom] = useState("");

    useEffect(()=>{
      fetch(`/student/assignedInfo/${location.state.id}`,{
        method:"GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
            },
            })
            .then(res=>res.json())
            .then((body)=>{
              setRoom(body);
              setHasLoaded(true);
            }
            )
  
      },[]);

    function sendVaccateRequest(){
      fetch(`/student/vacateRequest/${room.currentStatusId}`,{
          method:"PUT",
          headers:{'Authorization':`Bearer ${jwt}`
      }})
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.status, response.text()]);
          else {
              return Promise.reject("Invalid Update Details attempt");
          }
      })
      .then(([status, body]) => {
         // alert(body);
         window.location.href = "/studentDashboard";
         setSnackbar({
          message: body,
          variant: 'success',
        });
          setButtonText("Vaccate Request Sent!");
      })
      .catch((message) => {
        //alert(message);
        setSnackbar({
          message: message,
          variant: 'success',
        });
      })
      ;

    }

  return (
    hasLoaded
    ?
    <div><StudentHeader/>
    <Wrapper>
      
      <div className="row border mb-6">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Your Room Details</h2>

          <div className="box">
            <div className="card-header">
          <center>Details of your Room </center>    
              <ul className="list-group list-group-flush">
                <li className="list-group-item mb-2">
                  <b>Hostel Name: {room.hostel.hostelName}</b> 
                 
                </li>
                <li className="list-group-item mb-2">
                  <b>Room Type: {room.room.roomType.roomName}</b>
                 
                </li>
                <li className="list-group-item mb-2">
                  <b>Room No: {room.room.roomNo}</b>
                
                </li>
                
                
               </ul>
            </div>
          </div>
         <center><Link className="btn btn-primary my-2" style={{ background: "rgb(13, 88, 100)" }} to={"/studentDashboard"}>
            Go Back
          </Link>
              </center> 
              <center>Want to Vaccate Room? </center><center>Click on the Vaccate Room Button to submit Request </center>
             <center> 
            <button className="btn btn-success mt-3" style={{textDecoration: "none",color:"white"}} 
            onClick={() => sendVaccateRequest()}>
                 {buttonText}</button> 
              </center>
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
    </div>
 
    :
    <p>Loading...</p>
        
        
  )
}

export default UserRoomdetails