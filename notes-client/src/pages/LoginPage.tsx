import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/notesApi";

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userId = await login(email, password);
      localStorage.setItem("user_id", userId.toString());
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
    </div>
  );
}
