import React, { useEffect, useState } from "react";
import type { Note } from "../types";
import { getNotes, deleteNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
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

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Your Notes</h1>
            <p style={styles.subtitle}>You have {notes.length} notes</p>
          </div>
          <button
            style={styles.primaryButton}
            onClick={() => navigate("/notes/new")}
          >
            + New Note
          </button>
        </div>

        {notes.length > 0 ? (
          <>
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <div style={styles.notesGrid}>
              {filteredNotes.map((note) => (
                <div key={note.id} style={styles.noteCard}>
                  <h3 style={styles.noteTitle}>{note.title}</h3>
                  <p style={styles.noteContent}>{note.content}</p>
                  <div style={styles.cardButtons}>
                    <button
                      style={styles.smallButton}
                      onClick={() => navigate(`/notes/edit/${note.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        ...styles.smallButton,
                        background: "#dc2626",
                        color: "white",
                      }}
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={styles.emptyMessage}>
            <p>You don't have any notes yet.</p>
            <p>
              Click <strong>"New Note"</strong> to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, any> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    paddingTop: "80px",
    fontFamily: "sans-serif",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },
  title: {
    fontSize: "28px",
    color: "#1f2937",
    margin: 0,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "14px",
    marginTop: "4px",
  },
  primaryButton: {
    background: "#2563eb",
    color: "white",
    padding: "10px 16px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    marginBottom: "24px",
    boxSizing: "border-box" as const,
  },
  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  noteCard: {
    background: "#fff",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 0 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  noteTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#111827",
  },
  noteContent: {
    fontSize: "14px",
    color: "#4b5563",
    flexGrow: 1,
    marginBottom: "12px",
    whiteSpace: "pre-wrap",
  },
  cardButtons: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },
  smallButton: {
    background: "#e5e7eb",
    color: "#1f2937",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
  },
  emptyMessage: {
    textAlign: "center" as const,
    color: "#6b7280",
    fontSize: "16px",
    padding: "40px 0",
  },
};
