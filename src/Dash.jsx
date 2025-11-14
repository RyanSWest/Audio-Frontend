import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image,Navbar, Accordion, Card, Button, Dropdown } from 'react-bootstrap';
import './neutral.css';
import QuickNav from './Nav';
import ThemeSelector from './Themer';
function Dash() {
  const [theme, setTheme] = useState('purple');
  const [user, setUser] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [title, setTitle] = useState('');
 
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3002/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const getLibrary = async () => {
      try {
        const res = await axios.get('http://localhost:3002/library', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylist(res.data.library || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    getLibrary();
  }, []);

  // Theme toggle
  useEffect(() => {
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
      themeLink.href = `/themes/${theme}.css`;
    } else {
      const link = document.createElement('link');
      link.id = 'theme-link';
      link.rel = 'stylesheet';
      link.href = `/themes/${theme}.css`;
      document.head.appendChild(link);
    }
  }, [theme]);

  const destroy = (id) => {
     axios.delete(`http://localhost:3002/library/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(() => {
      setPlaylist(playlist.filter((el) => el.id !== id));
      console.log('Deleted track with id:', id);
    }).catch((err) => {
      console.error(err);
    });
  };
  return (
    <Container fluid className="full-scroll-container">
      {/* Hero Header */}
      <QuickNav />
      <div className ='dash-top'> 
      <Navbar variant='dark'>  


        <Dropdown autoClose={true}>
      <Dropdown.Toggle variant="secondary" id="dropdown-theme">
        Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setTheme('purple')}>Purple</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('green')}>Green</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('cyan')}>Cyan</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('red')}>Red</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        
          
         </Navbar>
      
      <Row className="align-items-center mb-4 flex-column flex-lg-row hero-section">
        <Col lg="auto" className="d-flex align-items-center gap-3 mb-3 mb-lg-0">
         
          <div className='top'>
             <Image
            src={user.photo}
            roundedCircle
            width={100}
            height={100}
            className="profile-pic"
          />
            <h1 className="profile-text mb-1">{user.username}</h1>
           </div>
             
         </Col>

        <Col className="d-flex gap-2 justify-content-lg-end">
                         <section className='sec'>  
                       <h3 className="playlist-name">{user.username}'s Playlist</h3>
                       <Button className='cyberpunk-button' 
                         onClick={()=>navigate('/upload')}> Upload New Tracks!!</Button>
                         </section>
                             
        </Col>
      </Row>

      {audioUrl && (
        <Row className="mb-3">
          <Col>
            <div className="player">
              <h5>{title}</h5>
              <audio controls src={audioUrl} style={{ width: '100%' }} />
            </div>
          </Col>
        </Row>
      )}

      {/* Playlist */}
      <Row className="gap-3 flex-column flex-lg-row">
        <Col lg={12}>
          <section className="scroll-section">
            {playlist.length > 0 ? (
              playlist.map((el) => (
                <Card
                  key={el.id}
                  className="mb-3 bg-transparent border-glow p-3 playlist-card"
                  onClick={() => setTitle(el.title)}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
                    <Card.Title className="mb-2 mb-sm-0">{el.title}</Card.Title>
                    <Button
                      className="cyberpunk-button"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAudioUrl(el.url);
                      }}
                    >
                      ▶ Play
                    </Button>


                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        destroy(el.id);
                      }}
                    >
                      X
                    </Button>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <p>No tracks yet. Upload some fire 🔥</p>
            )}
          </section>
        </Col>
      </Row>
    </div>
    </Container>
  );
}

export default Dash;
