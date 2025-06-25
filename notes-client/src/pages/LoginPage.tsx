import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/notesApi";

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("1234");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/notes");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      localStorage.setItem("access_token", token);
      navigate("/notes");
    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setShowRegister(true)}>Register</button>
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        setSuccess("Registration successful! You can now log in.");
      } else {
        const data = await res.json();
        setError(data.detail || "Registration failed");
      }
    } catch (e) {
      setError("Registration failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <h2>Register</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <button onClick={onClose}>Close</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
      </div>
    </div>
  );
}
