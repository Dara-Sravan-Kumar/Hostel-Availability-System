import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import WardenHeader from '../WardenHeader';
import '../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../util/useLocalStorage';
import {  Snackbar } from '@blotoutio/ui-kit';
import { Wrapper } from '../../admin/hostel/style';


const UpdateWardenPassword = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userEmail, setUserEmail] = useLocalState("", "userEmail");

    const [password, setPassword] = useState("");
    const [passwordRe, setPasswordRe] = useState("");
    const [snackbar, setSnackbar] = useState({
        variant: 'success',
        message: '',
      });
     
      const [pwdError, setPwdError] = useState(false);
      const [diffError, setDiffError] = useState(false);

    function sendUpdateRequest () {
      
        
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/.test(password)) {
            
            setPwdError(true);
            setDiffError(false);
            
              return;
            
         }
        
        if(!(password === passwordRe)) {
            setPwdError(false);
            setDiffError(true);
           
            return;
        }

        const reqBody = {
            "username" : userEmail,
            "password" : password,
        };

        fetch('/auth/updatePassword',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body : JSON.stringify(reqBody)
        })
        .then((response) => {
          if (response.status === 200)
            return Promise.all([response.status, response.text()]);
            else return Promise.reject("Invalid Update Details attempt");
        })
        .then(([status, body]) => {
           
           setSnackbar({
            message: body,
            variant: 'success',
          });
          window.location.href = "/wardenDashboard";
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
        <>
            <WardenHeader />
         
            <Wrapper>
            <div class=" shadow mb-5 bg-white rounded">
                {/* <section className='d-flex justify-content-between'> */}
                    {/* <div className="left_data mt-2 p-3" style={{ width: "100%" }}> */}
                    <div class="container-fluid">
                      
                     <form>
                     <h5 className='mb-3'><b>Change Password</b></h5>
                        <div class="form-group mb-3">
                        
                            <label for="exampleFormControlInput1">New Password</label>
                            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Enter Password" value={password} 
                                onChange = {(e) => setPassword(e.target.value)}   />
                            {pwdError && <span style={{color: 'red'}}> <p>Your password format must be Minimum eight and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character:</p></span>}
                            {diffError && <span style={{color: 'red'}}> <p>Enter same password in both fields</p></span>}
    
                        </div>
                        <div class="form-group mb-3">
                        
                            <label for="exampleFormControlInput2">Confirm New Password</label>
                            <input type="password" class="form-control" id="exampleFormControlInput2" placeholder="Re-Enter Password"  value={passwordRe} 
                                onChange = {(e) => setPasswordRe(e.target.value)}  />
                                {pwdError && <span style={{color: 'red'}}> <p>Your password format must be Minimum eight and maximum 14 characters, at least one uppercase letter, one lowercase letter, one number and one special character:</p></span>}
                                {diffError && <span style={{color: 'red'}}> <p>Enter same password in both fields</p></span>}
                        </div>
                         
                        <div className='mb-3'>
                    <center>   <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "#37387a" }} type="button" onClick={() => sendUpdateRequest()}>
                           Update Password
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
    )
}

export default UpdateWardenPassword;

