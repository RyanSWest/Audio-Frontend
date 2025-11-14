import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './App.css';
import'./login.css';
import './neutral.css';
import '../public/themes/purple.css';
import MiniPlaylist from './mini';
import {Image, Card, Button,Dropdown,DropdownButton, Offcanvas, Container}from 'react-bootstrap'
import QuickNav from './Nav';

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [user,setUser]=useState({});
  const [playlist,setPlaylist]=useState([]);
  const [list,setList]=useState(false)
   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate=useNavigate()
  


useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // keep using your token
        if (!token) return;

        const response = await axios.get('http://localhost:3002/me', {
          headers: {
            Authorization: `Bearer ${token}`, // pass token in header
          },
        });

        setUser(response.data); // your /me returns req.user directly
        console.log('User data:', response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser({});
      }
    };

    const getLibrary = async () => {
      try {
        const token = localStorage.getItem('token'); // keep using your token
        if (!token) return;

        const response = await axios.get('http://localhost:3002/library', {
          headers: {
            Authorization: `Bearer ${token}`, // pass token in header
          },
        });

        console.log('Library data:', response.data.library);
        setPlaylist(response.data.library || []);

      } catch (error) {
        console.error('Error fetching library data:', error);
      }
    }
    getLibrary();
    fetchUser();
  }, [playlist.length]);


  console.log('Token:', localStorage.getItem('token'));
  console.log('User in App:', user);
  console.log("PLAYLIST:",playlist);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('audio/')) {
        setMessage('❌ Please select an audio file');
        return;
      }
      const fileName = selectedFile.name;
    const titleFromFile = fileName.replace(/\.(mp3|wav|ogg|m4a|flac)$/i, '');
    setTitle(titleFromFile);
    setFile(selectedFile);
    
    setMessage('✅ File selected: ' + selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('❌ Please select a file first');
      return;
    }

    setUploading(true);
    setMessage('📤 Uploading...');

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('title', title); // Add title field
    formData.append('genre', genre); // Add genre field if you have it
   console.log(localStorage.getItem('token'))
    
    try {


      const token = localStorage.getItem('token');
    
    if (!token) {
      setMessage('❌ Please login first');
      setUploading(false);
      return;
    }

      const response = await axios.post('http://localhost:3002/upload',formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,

        'Content-Type': 'multipart/form-data'
      }
    }




      );
      
      setMessage('✅ Upload successful!');
      setAudioUrl(response.data.audio.url);
      console.log('Response:', response.data);
      console.log('Uploaded audio URL:', response.data.audio.url);  
    } catch (error) {
      setMessage('❌ Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className= 'full-scroll-container'>  
    <QuickNav />
?    <div className="dash-top">
      <div>  
           {/* <Button variant="primary" onClick={handleClose}>
         {user.username} Playlist
      </Button>

      <Offcanvas show={show} onHide={handleClose}  placement='end' responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
           {playlist.map((element) => (
           <> 
           <p>{element.title}</p>
           <audio controls >
             <source src={element.url} type="audio/mpeg" />
             Your browser does not support the audio element.
           </audio>
            
           </> 
        ))}
        </Offcanvas.Body>
      </Offcanvas>  */}


           {/* <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
      </div>
      <section className='top'> 
        <MiniPlaylist style ={{zIndex:1}}/>
        



         <Image src={user.photo} className  = 'profile-pic'roundedCircle
        
        width="100" height="100" alt="User Photo"  />
               <h2  
               onClick={()=>navigate('/dashboard')}
               className ='playlist-name'>{user.username}</h2>
 
        {/* <p>{user.bio}</p> */}
      </section>



      <section className='playlist'>
         
        
 
        
          

         
        
      </section>
            <div className="bg-overlay" aria-hidden="true"></div>
            
       
      <div className="up-sec">

              <h2 className='neon-text'>🎵 Audio Upload</h2>
      <section className='sec2'>  
        <h2 className="playlist-name" 
        onClick={()=>navigate('/dashboard')}
        >{user.username}'s Playlist</h2>
          <input 
          type="file" 
          accept="audio/*" 
          onChange={handleFileChange}
          disabled={uploading}
        />

        </section>
        

        <section className='sec'>  

                

         <button 
        className ='cyberpunk-button'
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Audio'}
        </button>
        </section>
        
        {/* <button 
        className ='cyberpunk-button'
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Audio'}
        </button> */}
      </div>

<div className='form-sec'>
      <input 
className='form'
       
  type="text" 
  placeholder="Song title *"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
/>

<input 
className='form'
  type="text" 
  placeholder="Genre (optional)"
  value={genre}
  onChange={(e) => setGenre(e.target.value)}
/> 
      {message && <p className="message">{message}</p>}


</div>
 
      {audioUrl && (
        <div className="player">
          <h3>Your uploaded audio:</h3>
          <audio controls src={audioUrl}>
            Your browser does not support audio playback.
          </audio>
        </div>
      )}
    </div>
    </Container>
  );
}

export default App;