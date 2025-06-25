import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/new" element={<CreateNotePage />} />
        <Route path="/notes/edit/:id" element={<EditNotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
