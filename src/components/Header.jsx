import { Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <>
        <Navbar expand="sm" className="bg-body-tertiary mb-3 shadow-sm">
            <Container>
            <Navbar.Brand href="#">Fashion Fiesta</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" className='custom-navbar-toggler'/>

            <Navbar.Offcanvas id="offcanvasNavbar-expand-sm" aria-labelledby="offcanvasNavbarLabel-expand-sm" placement="end">
                <Offcanvas.Header closeButton className='custom-offcanvas-close'>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm" style={{'color': 'rgb(168, 0, 168)'}}>
                    Menu
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link>
                        <Link to='/' className='link'>Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/collections' className='link'>Collections</Link>
                    </Nav.Link>
                    <Nav.Link className='position-relative d-none d-lg-inline'>
                        <Link to='/cart' className='link'><FaShoppingCart /><span className="position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{'font-size': '10px'}}>5</span></Link>
                    </Nav.Link>

                    <NavDropdown title="Login" id="offcanvasNavbarDropdown-expand-sm" className='ps-lg-2 fw-semibold'>
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
        </Navbar>
    </>
  )
}
