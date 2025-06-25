import { useState } from "react";
import { createNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const userId = Number(localStorage.getItem("user_id"));
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    await createNote({ title, content, user_id: userId });
    navigate("/notes");
  };

  return (
    <div>
      <h1>Create Note</h1>
      <input
        placeholder="Title *"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Save</button>
      <button onClick={() => navigate("/notes")}>Cancel</button>
    </div>
  );
}
