import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';

function AdminNavbar({menuItems}) {
  return (
    <Navbar collapseOnSelect expand='lg' style={{ background: '#37387a' }}>
      <Container fluid='xxl'>
        <Navbar.Brand href='/admin/dashboard'>
          <p class='text-white'>Hostel Availability Project</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            {menuItems.map((menu, index) => {
              return (
                <Nav.Link
                  href={menu.url}
                  key={index}
                >
                  <p class="text-white">{menu.title}</p>
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
