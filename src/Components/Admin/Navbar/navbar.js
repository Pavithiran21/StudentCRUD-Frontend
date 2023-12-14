import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export const Header = () => {
  

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="/" className='text-white'>MarkBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/admin-dashboard" className='text-white'>Dashboard</Nav.Link>
            <Nav.Link href="/all-student/" className='text-white'>Student List</Nav.Link>
            <Nav.Link href="/" className='text-white'>Logout</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};








