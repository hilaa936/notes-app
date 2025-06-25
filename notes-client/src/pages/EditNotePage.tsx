import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotes, updateNote, deleteNote } from "../api/notesApi";
import type { Note } from "../types";
import { sharedStyles } from "../styles/sharedStyles";

export default function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getNotes()
      .then((notes) => {
        const found = notes.find((n) => n.id === Number(id));
        if (found) {
          setNote(found);
          setTitle(found.title);
          setContent(found.content);
        } else {
          navigate("/notes");
        }
      })
      .catch(() => {
        alert("Failed to fetch note");
        navigate("/");
      });
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!note) return;
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    try {
      await updateNote({ ...note, title, content });
      navigate("/notes");
    } catch {
      alert("Failed to update note");
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      await deleteNote(note.id);
      navigate("/notes");
    } catch {
      alert("Failed to delete note");
    }
  };

  if (!note) return <div style={styles.page}>Loading...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Edit Note</h1>

        <label style={styles.label}>Title *</label>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />
        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Content</label>
        <textarea
          style={{ ...styles.input, height: "150px", resize: "vertical" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div style={styles.buttonGroup}>
          <button style={styles.primaryButton} onClick={handleUpdate}>
            Save
          </button>
          <button style={styles.dangerButton} onClick={handleDelete}>
            Delete
          </button>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/notes")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
const styles = sharedStyles;
