import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./futuristicNav.css"; // separate CSS file for styling

export default function FuturisticNav() {
  return (
    <Navbar expand="lg" className="futuristic-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" 

        
        className="futuristic-brand" 
        
        >
          ⚡ Audio Dashboard
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard" className="futuristic-link">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/upload" className="futuristic-link">
              Upload
            </Nav.Link>
            <Nav.Link as={Link} to="/settings" className="futuristic-link">
              Settings
            </Nav.Link>
            <Nav.Link
              href="https://maybeart.app"
              className="futuristic-link"
            >
              ↩ Back
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
