import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Stack from "react-bootstrap/Stack"

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ background: "#37387a" }}>
      <Container fluid="xxl">
        <Navbar.Brand href="/"><p class="text-white">Hostel Availability Project</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/"><p class="text-white">HOME</p></Nav.Link>
            <Nav.Link href="/Login"><p class="text-white">LOGIN</p></Nav.Link>
            <Nav.Link href="/StudentRegistration"><p class="text-white">SIGNUP</p></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header







/*import {React} from 'react'
import './Header.css'

const Dashboard = () => {
 return (
    <>
    <nav className="header">
        <div className="nav-wrapper">
            <a className="logo text-white" href='/'>Hostel Availability Project</a>
            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>

            <ul className="menu">
                <li><a className="menu text-white" href="/">Home</a></li>
                <li><a className="menu text-white" href="/AboutUs">About Us</a></li>
                <li><a className="menu text-white" href="/Login">Login</a></li>  
                <li><a className="menu text-white" href="/Signup">SignUp</a></li>  
                <li><a className="menu text-white" href="/Contact">Contact Us</a></li>  
                
             
                
                         
            </ul>
        </div>
    </nav>
    
            </>
)
  

 }
export default Dashboard

*/



/*import {React} from 'react'
import { Link} from 'react-router-dom'
import {Navbar} from "react-bootstrap";



const Header = () => {
  
   
    return (
        <> 
            <Navbar class="navbar navbar-expand-lg" style={{ background: "#37387a" }}>
                 
                <Link class="navbar-brand text-white" to="/">HOSTEL AVAILABILITY PROJECT</Link>
                     
                <div class="collapse navbar-collapse" id="navbarNav">
                     <ul class="navbar-nav">
                    <li class="nav-item"> <Link class="nav-link text-white" to="/">Home</Link></li>
                    <li class="nav-item"><Link class="nav-link text-white" to="/login">Login</Link></li>
                    <li class="nav-item"><Link class="nav-link text-white" to="/Signup">Signup</Link></li>
                    <li class="nav-item"><Link class="nav-link text-white" to="/contact">Contact</Link></li>
                    </ul>
                    <div class="side">
                  <ul>  <li class="nav-item"> <Link class="nav-link text-white" to="/">Home</Link></li>
                    <li class="nav-item"><Link class="nav-link text-white" to="/login">Login</Link></li>
                    </ul>
                    </div>
                </div>
            </Navbar>
                
                
        </>
  );
}


export default Header


/*<div class="container-fluid">*/














