import axios from "axios";
import type { Note } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const LOGIN_ENDPOINT = "/login";
const NOTES_ENDPOINT = "/notes";

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
  const res = await axios.post(`${API_BASE}${LOGIN_ENDPOINT}`, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data.access_token;
};

export const getNotes = async (): Promise<Note[]> => {
  const res = await axios.get(`${API_BASE}${NOTES_ENDPOINT}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const res = await axios.post(`${API_BASE}${NOTES_ENDPOINT}`, note, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const res = await axios.put(
    `${API_BASE}${NOTES_ENDPOINT}/${note.id}`,
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
  await axios.delete(`${API_BASE}${NOTES_ENDPOINT}/${id}`, {
    headers: getAuthHeader(),
  });
};
