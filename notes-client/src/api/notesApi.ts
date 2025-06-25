import axios from "axios";
import type { Note } from "../types";

const API_BASE = "http://localhost:8000";

export const login = async (
  email: string,
  password: string
): Promise<number> => {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  return res.data.user_id;
};

export const getNotes = async (userId: number): Promise<Note[]> => {
  const res = await axios.get(`${API_BASE}/notes`, {
    params: { user_id: userId },
  });
  return res.data;
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const res = await axios.post(`${API_BASE}/notes`, note, {
    params: { user_id: note.user_id },
  });
  return res.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const res = await axios.put(`${API_BASE}/notes/${note.id}`, {
    title: note.title,
    content: note.content,
  });
  return res.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/notes/${id}`);
};
