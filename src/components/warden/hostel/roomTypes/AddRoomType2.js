import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import WardenHeader from '../../WardenHeader';
import '../../css/Style.css';
import { useState, useEffect, useMemo } from "react";
import { useLocalState } from '../../../../util/useLocalStorage';
import { Wrapper } from '../../../admin/hostel/style';
import { Snackbar } from '@blotoutio/ui-kit';


const AddRoomType = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    const [roomName, setRoomName] = useState("");
    const [roomFee, setRoomFee] = useState("");
    const [roomCapacity, setRoomCapacity] = useState("⬇️ Select Room Capacity ⬇️");
    const [snackbar, setSnackbar] = useState({
        variant: 'success',
        message: '',
      });
    let handleRoomTypeChange = (e) => {
        setRoomCapacity(e.target.value)
      }

    function sendNewRoomTypeRequest () {

        if(roomCapacity === "⬇️ Select Room Capacity ⬇️") {
           // alert("Select Room Capacity");
           setSnackbar({
            message:"Select Room Capacity",
            variant: 'success',
          });
            return;
        }

        fetch(`/warden/addRoomType/${roomName}, ${roomFee}, ${roomCapacity}`,{
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
                return Promise.reject("Invalid Update Details attempt");
            }
        })
        .then(([status, body]) => {
           // alert(body);
           setSnackbar({
            message:(body),
            variant: 'success',
          });
          window.location.href = "/warden/viewRoomTypes";
        })
        .catch((message) => {
         // alert(message);
         setSnackbar({
            message:(message),
            variant: 'success',
          });
        });
    }

    return (
            
            <>
            <WardenHeader />
            <Wrapper>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 mb-5 shadow">
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-2 p-3" style={{ width: "100%" }}>
                 <center>      <h3 className='text-center col-lg-6 mb-3'>Add New Room</h3></center> 
                        <Form >

                         <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                             <Form.Label column sm="2">
                             <i class="zmdi zmdi-account material-icons-name"></i> Room Name
                             </Form.Label>
                             <Col sm="10">
                             <Form.Control 
                                type="roomName" 
                                placeholder="Enter Room Name"
                                value={roomName} 
                                onChange = {(e) => setRoomName(e.target.value)} 
                            />
                            </Col>
                         </Form.Group>

                         <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                            <Form.Label column sm="2">
                            <i class="zmdi zmdi-account material-icons-name"></i> Room Fee
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control 
                                type="roomFee" 
                                placeholder="Enter Room Fee"
                                value={roomFee} 
                                onChange = {(e) => setRoomFee(e.target.value)} 
                            />
                            </Col>
                         </Form.Group>

                         <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                            <Form.Label column sm="2">
                            <i class="zmdi zmdi-account material-icons-name"></i> Room Capacity
                            </Form.Label>
                            <Col sm="10">
                            <select onChange={handleRoomTypeChange}> 
                            <option value="⬇️ Select Room Capacity ⬇️"> -- Select Room Capacity -- </option>
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            </select>
                            </Col>
                         </Form.Group>
                       
                    <center>   <Button id="sumbit" variant="primary" className='col-lg-6' style={{ background: "#37387a"  }} type="button" onClick={() => sendNewRoomTypeRequest()}>
                           Add New Room
                       </Button></center>

                        </Form>
                    </div>
                </section>
             
            </div></div>
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

export default AddRoomType;