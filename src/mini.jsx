
import { useState, useEffect } from "react";
import axios from "axios";
import './mini.css';

const songs = [
  { id: 1, title: "Song One" },
  { id: 2, title: "Song Two" },
  { id: 3, title: "Song Three" },
  { id: 4, title: "Song Four" },
];

export default function MiniPlaylist() {
  const [open, setOpen] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
     const getLibrary = async () => {
      try {
        const res = await axios.get('http://3.147.102.4:3002/library', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylist(res.data.library || []);
      } catch (err) {
        console.error(err);
      }
    };

    
    getLibrary();
    },[]);    

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          background: "#111",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: 6,
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        🎵
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 50,
            left: 10,
            width: 180,
            height: 250,
            background: "#222",
            color: "#fff",
            padding: 10,
            borderRadius: 8,
            overflowY: "auto",
            zIndex: 9999,
          }}
        >
          <h4 style={{ marginTop: 0 }}>Playlist</h4>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {playlist.map((s) => (
              <li
                key={s.id}
                style={{
                  padding: "4px 0",
                  borderBottom: "1px solid #444",
                  cursor: "pointer",
                  onhover: { background: "#333" },
                  onClick: () => { setAudioUrl(s.audioUrl); }
                }}
              >

                 
                {s.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
