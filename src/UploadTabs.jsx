import React, { useState } from "react";
import FileTab from "./FIleTab.jsx";
import UrlTab from "./UrlTab.jsx";

export default function UploadTabs() {
  const [form, setForm] = useState({
    file: null,
    audioUrl: "",
    title: "",
    genre: ""
  });
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("file"); // "file" or "url"

  return (
    <div>
      {/* Tab buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("file")}>File Upload</button>
        <button onClick={() => setActiveTab("url")}>URL Upload</button>
      </div>

      {/* Active tab */}
      {activeTab === "file" && (
        <FileTab form={form} setForm={setForm} uploading={uploading} setUploading={setUploading} />
      )}
      {activeTab === "url" && (
        <UrlTab form={form} setForm={setForm} uploading={uploading} setUploading={setUploading} />
      )}
    </div>
  );
}
