import { useState } from "react";
import { createNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await createNote({ title, content, user_id: 0 }); // user_id is ignored by backend
      navigate("/notes");
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/");
      } else {
        alert("Failed to create note");
      }
    }
  };

  return (
    <div>
      <h1>New Note</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
