// https://soundcloud.com/ryan-west-234122070/femi-itch1?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing




import React, { useState,useEffect } from 'react';
import axios from 'axios';



function Uploadurl() {

     const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [user, setUser] = useState({});
  const [playlist, setPlaylist] = useState([]);

       const token =localStorage.getItem('token')


  useEffect(()=>{

    axios.get('http://3.147.102.4:3002/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
  }, [token])

 

  const upload = async (e) => {
    e.preventDefault();


    if (!title) {
      setMessage("Please enter title");
      return;
    }
    if (!audioUrl) {
      setMessage("Please enter URL");
      return;
    }

    const payload = { file: audioUrl,audio: audioUrl, title: title, genre: genre };
 
    try {
      const response = await axios.post('http://3.147.102.4:3002/upload-url', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'        },
      });
      console.log(response.data.audio.url)
      const temp= response.data.audio.url
      setMessage("Upload successful");
      setAudioUrl(temp)
    } catch (error) {
      setMessage("Upload failed: " + error.message);
    }
  };

  return (
    <div>Uploadurl 

       <h1> {message}</h1>


           <section>
            <form type="submit">
              <input
                type="text"
                placeholder="enter valid url"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
              />

              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="genre (optional)"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <button type='submit' onClick={upload}>
                Upload
              </button>
            </form>
          </section> 
           <div className="player">
            <h3>Your uploaded audio:</h3>
            <audio controls src={audioUrl}>
              Your browser does not support audio playback.
            </audio>
          </div>
          
          
    </div>
  )
}

export default Uploadurl