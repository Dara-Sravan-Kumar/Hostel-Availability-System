import React from 'react'
import {useEffect,useState } from "react";
import { useLocalState } from '../../util/useLocalStorage';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './css/HomeContent.css';
import {useNavigate} from 'react-router-dom';

const Studenthomepagefile = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userEmail, setUserEmail] = useLocalState("", "userEmail");
    const [gender, setGender] = useLocalState("", "gender");
    const [hasLoaded, setHasLoaded] = useState();
    const[student,setStudent]=useState();
  
    const [hasNoHostel, setHasNoHostel] = useState();
    const [hasAllotRoomReq, setHasAllotRoomReq] = useState();
    const [hasHostel, setHasHostel] = useState();
    const [hasVacateHostelReq, setHasVacateHostelReq] = useState();
    
    useEffect(()=>{
      fetch(`/student/viewProfile/${userEmail}`,{
        method:"GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
            },
            })
            .then(res=>res.json())
            .then( (result)=>{
              setStudent(result);
              setGender(result.studentGender);
              fetch(`/student/assignedInfo/${result.studentId}`,{
                method:"GET",
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                    },
                    })
                    .then(re=> re.text())
                    .then((b)=>{
                      if(Object.keys(b).length === 0) setHasNoHostel(true);
                      else {
                        if (b.includes('"vacate_status":"R"')) setHasVacateHostelReq(true);
                        else setHasHostel(true);
                      }
                    }
                    )
  
                    fetch(`/student/viewRoomReq/${result.studentId}`,{
                      method:"GET",
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${jwt}`
                          },
                          })
                          .then(r=>r.text())
                          .then((b)=>{
                            if(b == "true") setHasAllotRoomReq(true);
                          }
                          )
              
              setHasLoaded(true);
              }
            )
  
      },[]);
  
      const navigate = useNavigate(); 
      const sendViewRoomRequest = () => {
        navigate("/Student/UserRoomdetails", {state:{id:student.studentId}});  
      }
  
  return (
    hasLoaded
    ?
    <div><div class="container-fluid">
    <div class="row no-gutter">
        <div class="col-md-6 d-none d-md-flex bg-image"></div>
        
        <div class="col-md-6 bg-light">
            <div class="login d-flex align-items-center pb-5 pt-0">


                <div class="container mt-0">
                    <div class="row mt-1">
                        <div class="col-lg-10 col-xl-7 mx-auto ">
                        <h2><b>Welcome To Hostel Website</b></h2>
                            

                        <div className="bg-container">
                  
                  {!hasAllotRoomReq && hasNoHostel ? <center><Link className="grey" to="/student/roomPage"><button className="button">Book Hostel</button></Link></center> : <div> </div>}
                  {hasAllotRoomReq ?<center><p className="button">   Allot Room Request has been Submitted To Warden  </p> </center> : <div> </div>}
                  {hasHostel ? 
               <center>  <Button className="button" id="sumbit" variant="primary" type="button" onClick={() => sendViewRoomRequest()}>
                  View Room Details
                  </Button></center> 
                  : 
                  <div> </div>}
                  {hasVacateHostelReq ?<center> <p className="button"> Vaccate Room Request has been Submitted To Warden </p> </center>: <div> </div>}
              </div>
                          
                            {  <h1>{student.studentName}'s Profile</h1> }
        <div className="box">
          <div className="card-header"> 
            <ul className="list-group list-group-flush">
            <li className="list-group-item mb-2">
                  <b>Name: </b> {student.studentName}  
                 
                </li>
                <li className="list-group-item mb-2">
                   <b>Email: </b>{student.email} 
                </li>
                <li className="list-group-item mb-2">
                  <b>Roll No: </b> {student.studentRollNo} 
                </li>
                <li className="list-group-item mb-2">
                 <b>Phone No: </b> {student.studentPhoneNo} 
                
                </li>
                <li className="list-group-item mb-2">
                  <b>Gender: </b> {student.studentGender}
                
                </li>
                <li className="list-group-item mb-2">
                   <b>Course Name: </b> {student.course.courseName}
                
                </li>
            </ul>
          </div>
        </div>
        
      

      <div/>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div></div>
:
<p>Loading...</p>
  )
}

export default Studenthomepagefile