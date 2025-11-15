import React from "react";
import axios from "axios";

export default function FileTab({ form, setForm, uploading, setUploading }) {
  const handleChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.file) return;

    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", form.file);
      formData.append("title", form.title);
      formData.append("genre", form.genre || "");

      await axios.post("http://3.147.102.4:3002/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });

      alert("File uploaded successfully!");
      setForm({ ...form, file: null, title: "", genre: "" });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept="audio/*" onChange={handleChange} disabled={uploading} />
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
      <button type="submit" disabled={uploading || !form.file}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </form>
  );
}
