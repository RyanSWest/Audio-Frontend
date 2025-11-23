const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

const API_URL = "https://api.maybeart.app:3002";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTcmlIYW51bWFuIiwiaWF0IjoxNzYzMzU0NTkzLCJleHAiOjE3NjM0NDA5OTN9.H4QSwh6S6fTw-hZHr9JnUgE24cgLpa5nNa2fkRzxQJo";

const buildTrackUrl = (track) => {
  if (track.filename === "external-url") return track.originalName;
  const cleanUrl = track.url.startsWith("/") ? track.url : `/${track.url}`;
  return `${API_URL}${cleanUrl}`;
};

async function fetchLibrary() {
  const res = await fetch(`${API_URL}/library`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.library || [];
}

async function uploadFile(filePath, title, genre = "") {
  if (!fs.existsSync(filePath)) {
    console.error("❌ File not found:", filePath);
    return null;
  }

  const formData = new FormData();
  formData.append("audio", fs.createReadStream(filePath));
  formData.append("title", title);
  formData.append("genre", genre);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  return await res.json();
}

async function run() {
  console.clear();
  console.log("📥 Fetching current playlist...");

  let playlist = await fetchLibrary();
  console.log("\n--- Current Playlist ---");
  playlist.forEach((track) => {
    console.log(track.title, "->", buildTrackUrl(track));
  });

  const filePath = "C:\\Users\\bluem\\Downloads\\NewWeirdo.wav";
  const title = "NewWeirdo";
  const genre = "test";

  console.log("\n📤 Uploading file:", filePath);
  const uploaded = await uploadFile(filePath, title, genre);

  if (uploaded && uploaded.audio) {
    playlist.push(uploaded.audio);
    console.log("\n✅ Upload successful!");
    console.log("\n--- Updated Playlist ---");
    playlist.forEach((track) => {
      console.log(track.title, "->", buildTrackUrl(track));
    });
  }
}

run().catch(console.error);
