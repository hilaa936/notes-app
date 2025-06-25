import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotes, updateNote } from "../api/notesApi";
import type { Note } from "../types";

export default function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("user_id"));
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getNotes(userId).then((all) => {
      const found = all.find((n) => n.id === Number(id));
      if (found) {
        setNote(found);
        setTitle(found.title);
        setContent(found.content);
      }
    });
  }, [id, userId]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!note) return;
    await updateNote({ ...note, title, content });
    navigate("/notes");
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Note</h1>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
      />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate("/notes")}>Cancel</button>
    </div>
  );
}
