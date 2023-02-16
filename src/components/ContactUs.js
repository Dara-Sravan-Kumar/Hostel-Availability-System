import React from "react"
import { useLocalState } from '../util/useLocalStorage';
import Header from './Header';
import { adminMenuItems } from './admin/dashboard/data';
import AdminNavbar from './admin/navbar/AdminNavbar';
import StudentHeader from './Student/StudentHeader';
import WardenHeader from './warden/WardenHeader';

function Contact() {

    const [authority, setAuthority] = useLocalState("", "authority");
 
    return (
      <>
      <React.Fragment>

      {
            authority === "ROLE_WARDEN" 
            ?
            <WardenHeader />
            :
            authority === "ROLE_STUDENT" 
            ?
            <StudentHeader />
            :
            authority === "ROLE_ADMIN" 
            ?
            <div>
                <AdminNavbar menuItems={adminMenuItems} />
            </div>
            :
            <Header/>
            }

        <div className="row border mb-6">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 mb-5 shadow">
      <section className="content-container">
          <div className="textArea"> 
              <h2>Contact Us</h2>
              <p>
                  We would love to hear from you!.<br/>
                  For any enquiries, feel free to drop us an email!
                  <center><b>admin@gmail.com</b></center>
              </p>
              <p>
                  How can we help you?
              </p>
          </div>

          <div className="block">
              <div className="row">
                  <div className="col-left">
                      <form id="contact" action="">
                        <h4>Leave us a message</h4>
                          <fieldset>
                              <input placeholder="Your Name" type="text" tabIndex="1" required autoFocus />
                          </fieldset>
                          <fieldset>
                              <input placeholder="Subject" type="text" tabIndex="2" required autoFocus />
                          </fieldset>
                          <fieldset>
                              <input placeholder="Your Email Address" type="email" tabIndex="3" required />
                          </fieldset>
                          <fieldset>
                              <input placeholder="Your Phone Number" type="tel" tabIndex="4" required />
                          </fieldset>
                          <fieldset>
                              <input placeholder="Type Your Message Here....." type="text" tabIndex="2" required autoFocus />
                          </fieldset>
                         
                          <fieldset>
                         <center><button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                         </center>  
                             </fieldset>
                      </form>
                  </div>
               
              </div>
          </div>
      </section></div></div>
  </React.Fragment></>
    )
}

export default Contact
