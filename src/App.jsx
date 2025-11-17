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
  Container,
} from "react-bootstrap";
import QuickNav from "./Nav";

const API_URL = "https://api.maybeart.app:3002";

function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [audioUrl, setAudioUrl] = useState(""); // currently playing/preview
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [user, setUser] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [hitSong, setHitsong] = useState({});

  const navigate = useNavigate();

  // Fetch user and playlist on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser({});
      }
    };

    const fetchLibrary = async () => {
      try {
        const res = await axios.get(`${API_URL}/library`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylist(res.data.library || []);
      } catch (err) {
        console.error("Error fetching library:", err);
      }
    };

    fetchUser();
    fetchLibrary();
  }, []);

  // File selection for upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("audio/")) {
      setMessage("❌ Please select an audio file");
      return;
    }

    const cleanTitle = selectedFile.name.replace(/\.(mp3|wav|ogg|m4a|flac)$/i, "");
    setTitle(cleanTitle);
    setFile(selectedFile);

    // Show local preview
    const previewUrl = URL.createObjectURL(selectedFile);
    setAudioUrl(previewUrl);

    setMessage(`✅ File selected: ${selectedFile.name}`);
  };

  // Upload handler
  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file first");
      return;
    }

    setUploading(true);
    setMessage("📤 Uploading...");

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("title", title);
    formData.append("genre", genre);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Please login first");
        setUploading(false);
        return;
      }

      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const serverUrl = `${API_URL}/${res.data.audio.url}`;
      setAudioUrl(serverUrl); // show uploaded file
      setMessage("✅ Upload successful!");

      // Add uploaded track to playlist locally
      setPlaylist((prev) => [
        ...prev,
        res.data.audio, // assuming server returns the audio object
      ]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed: " + err.message);
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Delete track
  const destroy = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${API_URL}/library/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setPlaylist(playlist.filter((el) => el.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <Container className="full-scroll-container">
      <QuickNav />
      <div className="dash-top">
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
          <Button variant="primary" onClick={logout}>
            Logout
          </Button>
        </section>

        <div className="bg-overlay" aria-hidden="true"></div>

        <div className="up-sec">
          <h2 className="neon-text">🎵 Audio Upload</h2>
          <section className="sec2">
            <h2 className="playlist-name">{user.username}'s Playlist</h2>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <Button
              className="cyberpunk-button"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload Audio"}
            </Button>
          </section>
        </div>

        {audioUrl && (
          <div className="player">
            <h3>Playing:</h3>
            <audio controls src={`${audioUrl}`} style={{ width: "100%" }} />
          </div>
        )}

        {/* Playlist */}
        <section className="scroll-section mt-4">
          {playlist.length > 0 ? (
            playlist.map((el) => {
              // Determine correct URL
              const trackUrl =
                el.filename === "external-url"
                  ? el.originalName
                  : `${API_URL}/${el.url}`;

              return (
                <Card
                  key={el.id}
                  className="mb-3 bg-transparent border-glow p-3 playlist-card"
                  onClick={() => setTitle(el.title)}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
                    <Card.Title>{el.title}</Card.Title>

                    <Button
                      className="cyberpunk-button"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAudioUrl(trackUrl);
                      }}
                    >
                      ▶ Play
                    </Button>

                    <Button
                      className="cyberpunk-button"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(trackUrl);
                      }}
                    >
                      📋 Copy URL
                    </Button>

                    <a
                      href={trackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ms-2"
                    >
                      {trackUrl}
                    </a>
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
              );
            })
          ) : (
            <p>No tracks yet. Upload some fire 🔥</p>
          )}
        </section>
      </div>
    </Container>
  );
}

export default App;
