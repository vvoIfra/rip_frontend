import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FC } from 'react'

const My_Navbar: FC = () => {
    return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{color:"white"}}>Кораблестроительная система</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{color:"white"}}>Домой</Nav.Link>
            <Nav.Link href="/auth" style={{color:"white"}}>Вход</Nav.Link>
   	 	  </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>)}
export default My_Navbar