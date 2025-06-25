import React, { useEffect, useState } from "react";
import type { Note } from "../types";
import { getNotes, deleteNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes()
      .then(setNotes)
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/");
        } else {
          alert("Failed to fetch notes");
        }
      });
  }, [navigate]);

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => navigate("/notes/new")}>New Note</button>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.title}</span>
            <button onClick={() => navigate(`/notes/edit/${note.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
