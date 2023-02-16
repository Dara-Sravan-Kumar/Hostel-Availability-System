import React from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button'
// import '../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import {  Snackbar } from '@blotoutio/ui-kit';
import { Wrapper } from './admin/hostel/style';
import {useNavigate} from 'react-router-dom';


const ForgotPassword = () => {

    const [userEmail, setUserEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate();
    function sendRequest () {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            
            setEmailError(true);
            
            
              return;
            
         }
        navigate("/setNewPassword", {state:{id:userEmail}});
    }

    return (
        <React.Fragment>
                                <Header/>
                                <Wrapper>
            <div class=" shadow mb-5 bg-white rounded">
            
                    <div class="container-fluid" style={{minHeight:'40vh'}}>
                      
                     <form>
                 <center><h5 className='mb-3'><b>Forgot Password?</b></h5></center>    
                   
                     <div class="form-group mb-3">
                        
                        <label for="exampleFormControlInput1">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter Email" value={userEmail} 
                                onChange = {(e) => setUserEmail(e.target.value)}/>
                        {emailError && <span style={{color: 'red'}}> <p>Invalid Email! Email Should be in format of eg@gmail.com </p></span>}
                          
                       
                    </div>

                        <div className='mb-2 mt-5'>
                    <center>   <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "#37387a" }} type="button" onClick={() => sendRequest()}>
                           Next
                       </Button></center> 
                       
                        </div>
                        
 
</form>
</div>
           </div>

      </Wrapper>
                               
                           </React.Fragment>
    )
}

export default ForgotPassword;