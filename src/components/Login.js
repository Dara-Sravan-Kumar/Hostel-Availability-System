import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SIGN_IMG from './SIgn_img';
import 'react-toastify/dist/ReactToastify.css';
import { useLocalState } from '../util/useLocalStorage';
import { useState,useContext } from "react";
import Header from './Header';
import { Snackbar } from '@blotoutio/ui-kit';


const Login = () => {
    
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userEmail, setUserEmail] = useLocalState("", "userEmail");
    const [authority, setAuthority] = useLocalState("", "authority");
    const [snackbar, setSnackbar] = useState({
      variant: 'success',
      message: '',
    });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    function sendLoginRequest () {
        const reqBody = {
        "username" : username,
        "password" : password
        };

        fetch('/auth/login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify(reqBody)
        }).then(response => Promise.all([response.json(), response.headers]))
        .then(([body, headers]) => {
          setJwt(headers.get("Authorization"));
          setUserEmail(body["email"]);

         if(body["authorities"][0]["authority"] === "ROLE_WARDEN") {
            setAuthority("ROLE_WARDEN");
            window.location.href = "/wardenDashboard";
          }
          else if(body["authorities"][0]["authority"] === "ROLE_STUDENT"){
            setAuthority("ROLE_STUDENT");
            window.location.href = "/studentDashboard";
          }
          else if(body["authorities"][0]["authority"] === "ROLE_ADMIN"){
            setAuthority("ROLE_ADMIN");
            window.location.href = "/admin/dashboard";
          }
        else setSnackbar({
          variant: 'error',
          message: "You don't have the authority to login",
        });
          })
          .catch((message) => {
            setSnackbar({
              variant: 'error',
              message: "Incorrect Email Password",
            });
          });
        
    }

    return (
        <>
        <Header />
        <div className="row border mb-6">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 mb-5 shadow">
        <div className="ui grid">
            <div className="container">
                <section className='d-flex'>
                <SIGN_IMG />
                <div className="left_data mt-1 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6 mb-4'>Sign IN</h3>
                        <Form >

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                            <Form.Label column sm="4">
                             Email
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control 
                                type="username" 
                                placeholder="username" 
                                value={username} 
                                onChange = {(e) => setUsername(e.target.value)} 
                            />
                            </Col>
                         </Form.Group>

                         <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                           Password
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange = {(e) => setPassword(e.target.value)} 
                            />
                            </Col>
                         </Form.Group>
                            <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "#37387a" }} onClick={() => sendLoginRequest()} type="button" >
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Forgot Password<span><NavLink to="/forgotPassword"><br></br>Click Here</NavLink></span> </p>
                        <p className='mt-3'>Don't Have an Account <span><NavLink to="/signup">Register Here</NavLink></span> </p>
                    </div>
                   
                </section>
                {snackbar && snackbar.message && (
              <Snackbar
                message={snackbar.message}
                variant={snackbar.variant}
                onClose={() => setSnackbar(null)}
              />
            )}
                
            </div></div></div></div>
              </>
    )
}

export default Login;
