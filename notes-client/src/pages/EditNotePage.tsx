import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotes, updateNote, deleteNote } from "../api/notesApi";
import type { Note } from "../types";

export default function EditNotePage() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes()
      .then((notes) => {
        const found = notes.find((n) => n.id === Number(id));
        if (found) setNote(found);
        else navigate("/notes");
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/");
        } else {
          alert("Failed to fetch note");
        }
      });
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!note) return;
    try {
      await updateNote(note);
      navigate("/notes");
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/");
      } else {
        alert("Failed to update note");
      }
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      await deleteNote(note.id);
      navigate("/notes");
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/");
      } else {
        alert("Failed to delete note");
      }
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Note</h1>
      <input
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
