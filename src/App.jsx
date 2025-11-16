import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./login.css";
import "./neutral.css";
import "../public/themes/purple.css";
import MiniPlaylist from "./mini";
import {
  Image,
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Accordion,
  Offcanvas,
  Container,
} from "react-bootstrap";
import QuickNav from "./Nav";

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [user, setUser] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [hitSong,setHitsong]=useState({})
  
  const navigate = useNavigate();

const API_URL = 'https://api.maybeart.app';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // keep using your token
        if (!token) return;

        const response = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // pass token in header
          },
        });

        setUser(response.data); // your /me returns req.user directly
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser({});
      }
    };

    const getLibrary = async () => {
      try {
        const token = localStorage.getItem("token"); // keep using your token
        if (!token) return;

        const response = await axios.get(`${API_URL}/library`, {
          headers: {
            Authorization: `Bearer ${token}`, // pass token in header
          },
        });

        console.log("Library data:", response.data.library);
        setPlaylist(response.data.library || []);
      } catch (error) {
        console.error("Error fetching library data:", error);
      }
    };
    getLibrary();
    fetchUser();
  }, []);

  console.log("Token:", localStorage.getItem("token"));
  console.log("User in App:", user);
  console.log("PLAYLIST:", playlist);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("audio/")) {
        setMessage("❌ Please select an audio file");
        return;
      }
      const fileName = selectedFile.name;
      const titleFromFile = fileName.replace(/\.(mp3|wav|ogg|m4a|flac)$/i, "");
      setTitle(titleFromFile);
      setFile(selectedFile);

      setMessage("✅ File selected: " + selectedFile.name);
    }
  };

  const createUrlFile = (e) => {
    e.preventDefault()
    if (!title) {
      setMessage("Please enter title");
    }
    if (!audioUrl) {
      setMessage("Please enter URL");
    }

    const payload = { audioUrl: audioUrl, title: title, genre: genre };

    setHitsong(payload);
    console.log("FILEY FILEY==>",hitSong);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file first");
      return;
    }

    setUploading(true);
    setMessage("📤 Uploading...");

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("title", title); // Add title field
    formData.append("genre", genre); // Add genre field if you have it
    console.log(localStorage.getItem("token"));
    console.log(formData)

 
 
    try {
      const token = localStorage.getItem("token");
      console.log("FORMMM++>",formData)

      if (!token) {
        setMessage("❌ Please login first");
        setUploading(false);
        return;
      }
        //  console.log('FORMBITCH',formData)
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "multipart/form-data",
        },
      });
      

      setMessage("✅ Upload successful!");
      setAudioUrl(response.data.audio.url);
      console.log("Response:", response.data,formData);
      console.log("Uploaded audio URL:", response.data.audio.url);
    } catch (error) {
      setMessage("❌ Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className="full-scroll-container">
      <QuickNav />?{" "}
      <div className="dash-top">
        <div>
  
        </div>
        <section className="profile-hero">
          <Image
            src={user.photo}
            className="profile-pic"
            roundedCircle
            width="85"
            height="85"
            alt="User Photo"
          />
          <h2 onClick={() => navigate("/dashboard")} className="playlist-name">
            {user.username}
          </h2>
        </section>

        <div className="bg-overlay" aria-hidden="true"></div>

        <div className="up-sec">
          <h2 className="neon-text">🎵 Audio Upload</h2>
          <section className="sec2">
            <h2
              className="playlist-name"
              onClick={() => navigate("/dashboard")}
            >
              {user.username}'s Playlist
            </h2>
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                marginTop: "20px",
              }}
            ></div>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </section>

          

          <section className="sec">
            <button
              className="cyberpunk-button"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload Audio"}
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

        <div className="form-sec">
          <input
            className="form"
            type="text"
            placeholder="Song title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="form"
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

        {/* <section className='mini-section'>
        <MiniPlaylist />
      </section> */}
      </div>
    </Container>
  );
}

export default App;
