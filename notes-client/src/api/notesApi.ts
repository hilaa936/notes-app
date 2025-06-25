import axios from "axios";
import type { Note } from "../types";

const API_BASE = "http://localhost:8000";

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  const res = await axios.post(`${API_BASE}/login`, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data.access_token;
};

export const getNotes = async (): Promise<Note[]> => {
  const res = await axios.get(`${API_BASE}/notes`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const res = await axios.post(`${API_BASE}/notes`, note, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const res = await axios.put(
    `${API_BASE}/notes/${note.id}`,
    {
      title: note.title,
      content: note.content,
    },
    {
      headers: getAuthHeader(),
    }
  );
  return res.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/notes/${id}`, {
    headers: getAuthHeader(),
  });
};
