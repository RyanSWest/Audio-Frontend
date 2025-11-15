import React from "react";
import axios from "axios";

export default function UrlTab({ form, setForm, uploading, setUploading }) {
  const handleChange = (e) => {
    setForm({ ...form, audioUrl: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.audioUrl) return;

    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      const payload = {
        file: {
          audiourl: form.audioUrl,
          title: form.title,
          genre: form.genre || ""
        }
      };

      await axios.post("http://3.147.102.4:3002/upload", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("URL uploaded successfully!");
      setForm({ ...form, audioUrl: "", title: "", genre: "" });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="text" placeholder="Enter URL" value={form.audioUrl} onChange={handleChange} />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre (optional)"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
      />
      <button type="submit" disabled={uploading || !form.audioUrl}>
        {uploading ? "Uploading..." : "Upload URL"}
      </button>
    </form>
  );
}
