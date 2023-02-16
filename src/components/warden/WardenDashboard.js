import React from 'react';
import WardenHeader from './WardenHeader';
import './css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../util/useLocalStorage';
import { Snackbar } from '@blotoutio/ui-kit';

const WardenDashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userEmail, setUserEmail] = useLocalState("", "userEmail");
    const[warden,setWarden]=useState([]);
    const [hasLoaded, setHasLoaded] = useState();
    const [hostelId, setHostelId] = useLocalState("", "hostelId");
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    useEffect(()=>{
        fetch(`/warden/viewWarden/${userEmail}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }, 
            })
            .then(response => Promise.all([response.json()]))
            .then(([body]) => {
              setHasLoaded(true);
                setWarden(body);
                if(!body.hostel || !body.hostel.hostelId) {
                  setSnackbar({
                    variant: 'error',
                    message: "Hostel not assigned",
                  });
                  setTimeout(() => {
                    window.location.href = '/logout'
                  }, 2000)
                  return
                }
                setHostelId(body.hostel.hostelId);
             });
            
    },[]);

    return (
        hasLoaded 
            ?
        <>
            <WardenHeader />
            
      
      <center><h1>Welcome Warden</h1></center>
          
          <div> <div className="container">
    <div className="row pb-4">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Your Profile</h2>

        <div className="box">
          <div className="card-header"> 
            <ul className="list-group list-group-flush">
              <li className="list-group-item mb-2">
                <b>Name: </b>{warden.wardenName}
              </li>
              <li className="list-group-item mb-2">
                <b>Email:</b> {warden.email}
              </li>
              <li className="list-group-item mb-2">
                <b>Phone No: </b>{warden.wardenPhoneNo}
              </li>
              <li className="list-group-item mb-2">
                <b>Hostel Name:</b> {warden.hostel ? warden.hostel.hostelName : '-'}
              </li>
              <li className="list-group-item mb-2">
                <b>Hostel Number:</b> {warden.hostel ? warden.hostel.hostelId : '-'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {snackbar && snackbar.message && (
              <Snackbar
                message={snackbar.message}
                variant={snackbar.variant}
                onClose={() => setSnackbar(null)}
              />
            )}
  </div></div>
           
        </>
        : 
        <p>Loading...</p>
    )
}

export default WardenDashboard;