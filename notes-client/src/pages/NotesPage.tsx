import React, { useEffect, useState } from "react";
import type { Note } from "../types";
import { getNotes, deleteNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const userId = Number(localStorage.getItem("user_id"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    getNotes(userId).then(setNotes);
  }, [userId]);

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h1>Your Notes</h1>
      <button onClick={() => navigate("/notes/new")}>+ New Note</button>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => navigate(`/notes/edit/${note.id}`)}>
            Edit
          </button>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
