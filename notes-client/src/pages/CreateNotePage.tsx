import { useState } from "react";
import { createNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";
import { sharedStyles } from "../styles/sharedStyles";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    try {
      await createNote({ title, content, user_id: 0 }); // user_id ignored by backend
      navigate("/notes");
    } catch {
      alert("Failed to create note");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Create New Note</h1>

        <label style={styles.label}>Title *</label>
        <input
          style={styles.input}
          placeholder="Enter note title"
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
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div style={styles.buttonGroup}>
          <button style={styles.primaryButton} onClick={handleCreate}>
            Save
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
