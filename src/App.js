import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout'
import StudentRegistration from './components/StudentRegistration';
import Errror from './components/Student/Errror'
import Contact from './components/ContactUs';
import Footer from './components/Footer'  
import AboutUs from './components/AboutUs';
import ForgotPassword from './components/ForgotPassword';
import SetNewPassword from './components/SetNewPassword';

import StudentDashboard from './components/Student/StudentDashboard';
import RoomPage from './components/Student/bookHostel/RoomPage';

import UpdateStudentPassword from './components/Student/profile/UpdatePassword';
import UserRoomdetails from './components/Student/vacateHostel/UserRoomdetails';

// import AdminDashboard from './components/admin/AdminDashboard';

import WardenDashboard from './components/warden/WardenDashboard';
import EditWardenProfile from './components/warden/profile/EditWardenProfile';
import UpdateWardenPassword from './components/warden/profile/UpdateWardenPassword';
import ViewRooms from './components/warden/hostel/rooms/ViewRooms';
import AddRoom from './components/warden/hostel/rooms/AddRoom';
import EditRoom from './components/warden/hostel/rooms/EditRoom';
import ViewRoomTypes from './components/warden/hostel/roomTypes/ViewRoomTypes';
import AddRoomType from './components/warden/hostel/roomTypes/AddRoomType';
import EditRoomType from './components/warden/hostel/roomTypes/EditRoomType';
import ViewStudentRecords from './components/warden/students/records/ViewStudentRecords';
import AllotRoomRequests from './components/warden/students/rooms/AllotRoomRequests';
import AllotRoom from './components/warden/students/rooms/AllotRoom';
import VacateRoomRequests from './components/warden/students/rooms/VacateRoomRequests';
import VacateRoom from './components/warden/students/rooms/VacateRoom';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AdminHostel from './components/admin/hostel/AdminHostel';
import AdminHostelAdd from "./components/admin/hostel/AdminHostelAdd";
import AdminHostelEdit from "./components/admin/hostel/AdminHostelEdit"
import AdminHostelEdit2 from "./components/admin/hostel/AdminHostelEdit2"
import AdminWarden from "./components/admin/Warden/AdminWarden"
import AdminWardenAdd from "./components/admin/Warden/AdminWardenAdd"
import AdminWardenEdit from "./components/admin/Warden/AdminWardenEdit"
import AdminWardenEdit2 from "./components/admin/Warden/AdminWardenEdit2"
import AdminCourse from './components/admin/course/AdminCourse';
import AdminCourseEdit from './components/admin/course/AdminCourseEdit';
import AdminCourseAdd from './components/admin/course/AdminCourseAdd';
import AllotRoomHelper from './components/warden/students/rooms/AllotRoomHelper';
import AdminRoomType from './components/admin/roomType/AdminRoomType';
import AdminRoomTypeEdit from './components/admin/roomType/AdminRoomTypeEdit';
import AdminRoomTypeAdd from './components/admin/roomType/AdminRoomTypeAdd';
import AdminStudent from './components/admin/student/AdminStudent';
import AdminStudentAdd from './components/admin/student/AdminStudentAdd';
import AdminStudentEdit from './components/admin/student/AdminStudentEdit';
import StudentEdit from './components/Student/profile/StudentEdit';


function App() {

  return (
  <div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/AboutUs' element={<AboutUs/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/StudentRegistration' element={<StudentRegistration/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
      <Route path='/setNewPassword' element={<SetNewPassword />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='*' element={<Errror />} />

      
      {/* <Route path='/admin/adminDashboard' element={<PrivateRoute><AdminDashboard /></PrivateRoute>}/> */}

      <Route path='/studentDashboard' element={<PrivateRoute><StudentDashboard/></PrivateRoute>}/>
      <Route path='/Student/studentEdit' element={<PrivateRoute><StudentEdit /></PrivateRoute>} />
      <Route path='/Student/UpdatePassword' element={<PrivateRoute><UpdateStudentPassword/></PrivateRoute>}/>
      <Route path='/student/roomPage' element={<PrivateRoute><RoomPage/></PrivateRoute>}/>
      <Route path='/Student/UserRoomdetails' element={<PrivateRoute><UserRoomdetails/></PrivateRoute>}/>
      
       <Route path='/wardenDashboard' element={
      <PrivateRoute>
        <WardenDashboard />
        </PrivateRoute>
      }
       />
       <Route path='/warden/editWardenProfile' element={
      <PrivateRoute>
        <EditWardenProfile />
        </PrivateRoute>
      }
       />
       <Route path='/warden/updatePassword' element={
      <PrivateRoute>
        <UpdateWardenPassword />
        </PrivateRoute>
      }
       />
       <Route path='/warden/viewRooms' element={
      <PrivateRoute>
        <ViewRooms />
        </PrivateRoute>
      }
       />
       <Route path='/warden/addRoom' element={
      <PrivateRoute>
        <AddRoom />
        </PrivateRoute>
      }
       />
       <Route path='/warden/editRoom' element={
      <PrivateRoute>
        <EditRoom />
        </PrivateRoute>
      }
       />
       <Route path='/warden/viewRoomTypes' element={
      <PrivateRoute>
        <ViewRoomTypes />
        </PrivateRoute>
      }
       />
       <Route path='/warden/addRoomType' element={
      <PrivateRoute>
        <AddRoomType />
        </PrivateRoute>
      }
       />
        <Route path='/warden/editRoomType' element={
      <PrivateRoute>
        <EditRoomType />
        </PrivateRoute>
      }
       />
       <Route path='/warden/viewStudentRecords' element={
      <PrivateRoute>
        <ViewStudentRecords />
        </PrivateRoute>
      }
       />
       <Route path='/warden/allotRoomRequests' element={
      <PrivateRoute>
        <AllotRoomRequests />
        </PrivateRoute>
      }
       />
       <Route path='/warden/allotRoom' element={
      <PrivateRoute>
        <AllotRoom />
        </PrivateRoute>
      }
       />
       <Route path='/warden/allotRoomHelper' element={
      <PrivateRoute>
        <AllotRoomHelper />
        </PrivateRoute>
      }
       />
       <Route path='/warden/vacateRoomRequests' element={
      <PrivateRoute>
        <VacateRoomRequests />
        </PrivateRoute>
      }
       />
       <Route path='/warden/vacateRoom' element={
      <PrivateRoute>
        <VacateRoom />
        </PrivateRoute>
      }
       />
          {/* TODO: Remove private route comments */}
          <Route
            path='/admin/dashboard'
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/hostel'
            element={
              <PrivateRoute>
                <AdminHostel />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/hostel/add'
            element={
              <PrivateRoute>
                <AdminHostelAdd />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/hostel/edit/:hostelId'
            element={
              <PrivateRoute>
                <AdminHostelEdit />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/hostel/edit2/:hostelId'
            element={
              <PrivateRoute>
                <AdminHostelEdit2 />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/warden'
            element={
              <PrivateRoute>
                <AdminWarden />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/warden/add'
            element={
              <PrivateRoute>
                <AdminWardenAdd />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/warden/edit/:email'
            element={
              <PrivateRoute>
                <AdminWardenEdit />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/warden/edit2/:email'
            element={
              <PrivateRoute>
                <AdminWardenEdit2 />
              </PrivateRoute>
            }
          />


          <Route
            path='/admin/course'
            element={
              <PrivateRoute>
                <AdminCourse />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/course/edit/:courseId'
            element={
              <PrivateRoute>
                <AdminCourseEdit />
              </PrivateRoute>
            }
          />


          <Route
            path='/admin/course/add'
            element={
              <PrivateRoute>
                <AdminCourseAdd />
              </PrivateRoute>
            }
          />

          
          <Route
            path='/admin/roomType'
            element={
              <PrivateRoute>
                <AdminRoomType />
              </PrivateRoute>
            }
          />


          <Route
            path='/admin/roomtype/add'
            element={
              <PrivateRoute>
                <AdminRoomTypeAdd />
              </PrivateRoute>
            }
          />

          
          <Route
            path='/admin/roomType/edit/:roomTypeId'
            element={
              <PrivateRoute>
                <AdminRoomTypeEdit />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/student'
            element={
              <PrivateRoute>
                <AdminStudent />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/student/add'
            element={
              <PrivateRoute>
                <AdminStudentAdd />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin/student/edit/:studentEmail'
            element={
              <PrivateRoute>
                <AdminStudentEdit />
              </PrivateRoute>
            }
          />


    </Routes>
    <Footer/>
    </div>
   
    
  );
}

export default App;

