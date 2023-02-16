import React from 'react'
import { useLocalState } from '../util/useLocalStorage';
import Header from './Header';
import { adminMenuItems } from './admin/dashboard/data';
import AdminNavbar from './admin/navbar/AdminNavbar';
import StudentHeader from './Student/StudentHeader';
import WardenHeader from './warden/WardenHeader';




const AboutUs = () => {

    const [authority, setAuthority] = useLocalState("", "authority");

    return (
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

            <section className="content-container">
                <div className="cust-container"> 

                    <h2>About Us</h2>
                    {/* <p>   Welcome to Hostel Availability Project </p> */}

                    <p align='justify'> 
                    This is our Capstone Project on the topic "Hostel Availability System Application". The problem statement was to Design a Hostel Availability System which
will be used for Booking Rooms in Hostel. There are 3 roles in this application Admin, Warden and Student. Admin and Warden would act as providers who would provide services to the Users. 
Students who would use those services for booking and vacating rooms in Hostels.

All the three users have common login dashboard whereas a new student who has not registered yet on the portal need to register first and then
only they can login. Warden cannot register themselves they will be manually getting their credentials from admin as only Admin has the right to register
New Warden.

                    </p>
<p align='justify'>Student Dashboard:
After Succesful login by any Student, They will see their profile details on the home page of student dashboard along with a Book Hostel button.Students have
to select any hostel from the list of available hostels,which are already filtered on the basis of login student's Gender. After selecting a particular hostel
a list of available rooms in that selected hostel will appear.Student can raise request for any room out of that and that request will be directly send to Warden.
Students can check their status on the homepage of student dashboard, if the request is pending they will see "Room Request has been send to warden" and if the
room request is accepted they will see a Vacate Room option in which student can see their alloted hostel, room and their details along with a vacte room buttomn
.They can anytime raise request for Vacating their room, this request will also send to warden directly. And students will be notified through SMS notification
whenevr their requests will get approved. Students can also edit their profile and update their Password.</p>

<p align='justify'>Warden Dashboard:
Warden can view and approve the requests raised by students for room allotment and vacate. They can view student records in their hostel, warden can add Types
of rooms available in hostel and rooms available in that particular category of room. They can also edit and delete these room details.Warden can Update their
password and edit their profiles anytime.</p>

<p align='justify'>
Admin Dashboard:
Admin can add Hostel, can edit its etails, Delete or Block Hostel from the portal. Only admin has the right to register a New Warden and assign a hostel to a warden, 
admin can edit wardens details, can delete a warden from portal.Admin can also edit and delete a Room Type and Course and also admin can edit any students details 
and delete the entry of any particular student from the portal anytime.

We also have a AboutUs and ContactUs page in Footer.

This was all about Hostel Availability System.</p>
                  
                </div>
            </section>
            
        </React.Fragment>
    )
}

export default AboutUs;